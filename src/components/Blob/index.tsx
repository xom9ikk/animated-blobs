/* eslint-disable @typescript-eslint/no-shadow */
import {
  FC, MutableRefObject, CSSProperties,
  useEffect, useRef, useMemo, useState,
} from 'react';
import * as blobs2Animate from 'blobs/v2/animate';
import { useUtils } from '@use/utils';
import { IColors } from '@type/entitines';
import { useBlob } from '@use/blob';
import { SystemActions } from '@store/actions';
import { useDispatch } from 'react-redux';
import { CaptureCanvas } from '../../plugins/capture-canvas';

interface IBlob {
  id: string,
  width: number,
  height: number,
  colors: IColors,
  seed?: number | string;
  randomness?: number;
  extraPoints?: number;
  size?: number;
  duration?: number,
  opacity?: number,
  isLoop?: boolean,
  isRec?: boolean,
  delay?: number,
  fps?: number,
  quality?: number,
  onFrame?: (id: string, canvasElement: HTMLCanvasElement) => void,
  style?: CSSProperties;
}

export const Blob: FC<IBlob> = ({
  id,
  width,
  height,
  colors,
  seed = Math.random(),
  randomness,
  extraPoints,
  size,
  duration = 5000,
  opacity = 100,
  isLoop = true,
  isRec = false,
  delay = 0,
  fps = 30,
  quality = 90,
  onFrame,
  style,
}) => {
  const dispatch = useDispatch();
  const { getRandomInt } = useUtils();
  const { setColors } = useBlob();

  const seedRef = useRef<number>(0);
  const animation = useRef<any>(null);
  const loopAnimation = useRef<any>(null);
  const renderAnimation = useRef<any>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const prevIsRecRef = useRef<boolean>(false);
  const isRecRef = useRef<boolean>(isRec);
  const captureCanvas = useRef<CaptureCanvas>();

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  const defaultBlobOptions = useMemo(() => ({
    timingFunction: 'ease',
    extraPoints: getRandomInt(3, 5),
    randomness: getRandomInt(15, 30),
    size: width,
  }), [width]);

  useEffect(() => () => {
    seedRef.current = null;
    loopAnimation.current = null;
    canvas.current = null;
    prevIsRecRef.current = null;
    isRecRef.current = null;
    captureCanvas.current = null;
  }, []);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    const context = canvas.current?.getContext('2d');
    setCtx(context);
  }, [canvas]);

  useEffect(() => {
    if (!ctx) {
      return;
    }

    setColors(ctx, colors, opacity, height);
  }, [ctx, colors, opacity, height]);

  const handleFrame = () => {
    onFrame?.(id, canvas.current!);
    if (isRecRef.current) {
      captureCanvas.current.recordFrame(canvas.current);
    }
  };

  useEffect(() => {
    if (!ctx) {
      return;
    }

    animation.current = blobs2Animate.canvasPath();

    seedRef.current = Math.random();

    const config: blobs2Animate.CanvasKeyframe = {
      duration: delay, // first duration for delay
      timingFunction: 'ease',
      blobOptions: {
        ...defaultBlobOptions,
        // seed,
        randomness: randomness || defaultBlobOptions.randomness,
        extraPoints: extraPoints || defaultBlobOptions.extraPoints,
        size: size || defaultBlobOptions.size,
        seed: seedRef.current,
      },
    };

    renderAnimation.current = (prevSeedValue: number, currentSeed: MutableRefObject<number>) => {
      handleFrame();
      ctx.clearRect(0, 0, width, height);
      ctx.fill(animation.current.renderFrame());
      if (prevSeedValue === currentSeed.current) {
        requestAnimationFrame(() => renderAnimation.current(prevSeedValue, currentSeed));
      }
    };

    requestAnimationFrame(() => renderAnimation.current(seedRef.current, seedRef));

    if (isLoop) {
      loopAnimation.current = () => {
        animation.current.transition({
          duration,
          timingFunction: 'ease',
          callback: loopAnimation.current,
          blobOptions: {
            ...defaultBlobOptions,
            randomness: randomness || defaultBlobOptions.randomness,
            extraPoints: extraPoints || defaultBlobOptions.extraPoints,
            size: size || defaultBlobOptions.size,
            seed: Math.random(), // new shape for transition
          },
        });
      };
      config.callback = loopAnimation.current;
    }

    animation.current.transition(config);
  }, [ctx, width, height, duration, delay, seed, randomness, extraPoints, size]);

  const handleStop = () => {
    captureCanvas.current.endRecording();
  };

  const handleProgress = (payload) => {
    const { type, id, progress } = payload;
    if (type === 'progress') {
      dispatch(SystemActions.updateProgress({ id, progress }));
    } else {
      dispatch(SystemActions.resetProgress(id));
    }
  };

  useEffect(() => {
    isRecRef.current = isRec;
    if (isRec) {
      captureCanvas.current = new CaptureCanvas({
        id,
        fps,
        quality,
        width,
        height,
        downloadFileName: `${id}-opacity-${opacity}.gif`,
        loopToInitialState: true,
      }, handleProgress);
    } else if (!isRec && prevIsRecRef.current) {
      dispatch(SystemActions.updateProgress({ id, progress: 0 }));
      handleStop();
    }
    prevIsRecRef.current = isRec;
  }, [isRec]);

  return useMemo(() => (
    <canvas
      ref={canvas}
      id={id}
      width={width}
      height={height}
      style={style}
    />
  ), [id, width, height, style]);
};
