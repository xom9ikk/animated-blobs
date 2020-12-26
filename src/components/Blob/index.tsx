import {
  FC, useEffect, useRef, useMemo, useState,
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
  blobOptions?: IBlobOptions,
  duration?: number,
  opacity?: number,
  isLoop?: boolean,
  isRec?: boolean,
  delay?: number,
  onFrame?: (id: string, imageData: ImageData, canvasElement: HTMLCanvasElement) => void,
}

export const Blob: FC<IBlob> = ({
  id,
  width,
  height,
  colors,
  blobOptions,
  duration = 5000,
  opacity = 1,
  isLoop = false,
  isRec = false,
  delay = 0,
  onFrame,
}) => {
  const { getRandomInt } = useUtils();
  const { setColors } = useBlob();

  const canvas = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    const context = canvas.current?.getContext('2d');
    setCtx(context);
  }, [canvas]);

  const defaultBlobOptions = {
    extraPoints: getRandomInt(3, 5),
    randomness: getRandomInt(15, 30),
    seed: Math.random(),
    size: getRandomInt(width - width / 5, width),
  };

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
    if (!ctx) {
      return;
    }

    setColors(ctx, colors, opacity, height);
  }, [colors]);

  useEffect(() => {
    if (!ctx) {
      return;
    }

    setColors(ctx, colors, opacity, height);

    const animation = blobs2Animate.canvasPath();

    const renderAnimation = () => {
      if (!canvas.current) {
        return;
      }
      const imageData = ctx.getImageData(0, 0, width, height);
      onFrame?.(id, imageData, canvas.current);
      ctx.clearRect(0, 0, width, height);
      ctx.fill(animation.renderFrame());
      requestAnimationFrame(renderAnimation);
    };

    requestAnimationFrame(renderAnimation);

    const loopAnimation = () => {
      animation.transition({
        duration,
        timingFunction: 'ease',
        callback: loopAnimation,
        blobOptions: {
          ...defaultBlobOptions,
          ...blobOptions,
          seed: Math.random(),
        },
      });
    };

    const config: blobs2Animate.CanvasKeyframe = {
      duration: delay,
      blobOptions: {
        ...defaultBlobOptions,
        ...blobOptions,
      },
    };

    if (isLoop) {
      config.callback = loopAnimation;
    }

    animation.transition(config);
  }, [ctx]);

  useEffect(() => {
    if (isRec) {
      handleRec();
    } else if (!isRec) {
      handleStop();
    }
  }, [isRec]);

  return useMemo(() => (
    <canvas
      id={id}
      ref={canvas}
      width={width}
      height={height}
    />
  ), [id, canvas, width, height]);
};
