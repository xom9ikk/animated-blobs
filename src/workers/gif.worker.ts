import { EnumWorkerType } from '@type/workers/gif';
import { GIFEncoder } from '../lib/jsgif.js';

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any;

const imagesData = [];

const times = (n, func, isRevert?) => {
  const result = [];
  if (isRevert) {
    for (let i = n - 1; i > 0; i -= 1) {
      result.push(func(i));
    }
  } else {
    for (let i = 0; i < n; i += 1) {
      result.push(func(i));
    }
  }
  return result;
};

const handleImageData = (data) => {
  imagesData.push(data);
};

const handleStart = ({
  id,
  fps,
  quality,
  loopToInitialState,
}) => {
  // @ts-ignore
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(1000 / fps);
  encoder.setQuality(quality);
  encoder.setTransparent([0x00, 0x00, 0x00]);
  encoder.start();

  const totalSize = loopToInitialState ? imagesData.length * 2 : imagesData.length; // 1000
  const step = Number((totalSize / 100).toFixed(0)) || 1; // 10 every 10 iterations new percent

  const processFrames = (isRevert?) => (i) => {
    if (i % step === 0) {
      const progress = isRevert ? 100 - (i / step) : i / step;

      ctx.postMessage({
        type: EnumWorkerType.Progress,
        payload: { id, progress },
      });
    }
    encoder.addFrame(imagesData[i], true);
  };

  const size = imagesData.length - 1;

  times(size, processFrames());

  if (loopToInitialState) {
    times(size, processFrames(true), true);
  }

  ctx.postMessage({
    type: EnumWorkerType.Progress,
    payload: { id, progress: 100 },
  });

  encoder.finish();

  const output = encoder.getOutput();
  ctx.postMessage({
    type: EnumWorkerType.Result,
    payload: output,
  });
};

ctx.onmessage = (msg) => {
  const { type, payload } = msg.data;
  switch (type) {
    case EnumWorkerType.Start:
      handleStart(payload);
      break;
    case EnumWorkerType.ImageData:
      handleImageData(payload);
      break;
    default:
      throw 'Invalid type';
  }
};
