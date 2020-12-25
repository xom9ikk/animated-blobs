import {
  FC, useEffect, useRef, useMemo,
} from 'react';
import * as blobs2Animate from 'blobs/v2/animate';
import { useUtils } from '@use/utils';

interface IColor {
  r: number;
  g: number;
  b: number;
}

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
  color?: IColor,
  colors?: Array<IColor>,
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
  color,
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

  const canvas = useRef<HTMLCanvasElement>(null);

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
    if (!canvas.current) {
      return;
    }
    const canvasCtx = canvas.current.getContext('2d');
    if (!canvasCtx) {
      return;
    }
    let gradient;
    if (color) {
      const { r, g, b } = color;
      canvasCtx.fillStyle = `rgba(${r},${g},${b},${opacity})`;
    } else if (colors) {
      const [{ r: r1, g: g1, b: b1 }, { r: r2, g: g2, b: b2 }] = colors;
      gradient = canvasCtx.createLinearGradient(0, 0, height, 0);
      gradient.addColorStop(0, `rgba(${r1},${g1},${b1},${opacity})`);
      gradient.addColorStop(1, `rgba(${r2},${g2},${b2},${opacity})`);
      canvasCtx.fillStyle = gradient;
    }

    const animation = blobs2Animate.canvasPath();

    const renderAnimation = () => {
      if (!canvas.current) {
        return;
      }
      const imageData = canvasCtx.getImageData(0, 0, width, height);
      onFrame?.(id, imageData, canvas.current);
      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.fill(animation.renderFrame());
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
  }, []);

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
