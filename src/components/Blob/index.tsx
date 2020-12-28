import {
  FC, MutableRefObject, CSSProperties,
  useEffect, useRef, useMemo, useState,
} from 'react';
import * as blobs2Animate from 'blobs/v2/animate';
import { useUtils } from '@use/utils';
import { IColors } from '@type/entitines';
import { useBlob } from '@use/blob';

interface IBlobOptions {
  seed?: number | string;
  randomness?: number;
  extraPoints?: number;
  size?: number;
}

interface IBlob {
  id: string,
  width: number,
  height: number,
  colors: IColors,
  // blobOptions?: IBlobOptions,

  seed?: number | string;
  randomness?: number;
  extraPoints?: number;
  size?: number;

  duration?: number,
  opacity?: number,
  isLoop?: boolean,
  isRec?: boolean,
  delay?: number,
  onFrame?: (id: string, imageData: ImageData, canvasElement: HTMLCanvasElement) => void,
  style?: CSSProperties;
}

export const Blob: FC<IBlob> = ({
  id,
  width,
  height,
  colors,
  // blobOptions,

  seed,
  randomness,
  extraPoints,
  size,

  duration = 5000,
  opacity = 1,
  isLoop = true,
  isRec = false,
  delay = 0,
  onFrame,
  style,
}) => {
  const { getRandomInt } = useUtils();
  const { setColors } = useBlob();

  const seedRef = useRef<number>(0);
  const animation = useRef<any>(null);
  const loopAnimation = useRef<any>(null);
  const renderAnimation = useRef<any>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

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

  const defaultBlobOptions = useMemo(() => ({
    timingFunction: 'ease',
    extraPoints: getRandomInt(3, 5),
    randomness: getRandomInt(15, 30),
    size: getRandomInt(width - width / 5, width),
  }), [width]);

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
      onFrame?.(id, ctx.getImageData(0, 0, width, height), canvas.current!);
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

  // const captureCanvas = useMemo(() => new CaptureCanvas({
  //   fps: 30,
  //   quality: 10,
  //   downloadFileName: `blob-${id}-opacity-${opacity}.gif`,
  //   loopToInitialState: true,
  // }), [id, opacity]);

  const handleRec = () => {
    // captureCanvas.startRecording(canvas.current);
  };

  const handleStop = () => {
    // captureCanvas.endRecording();
  };

  useEffect(() => {
    if (isRec) {
      handleRec();
    } else if (!isRec) {
      handleStop();
    }
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
