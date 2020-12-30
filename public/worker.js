/* eslint-disable @typescript-eslint/no-throw-literal,no-undef,no-restricted-globals */
import { GIFEncoder } from './jsgif.js';

const imagesData = [];

const times = (n, func, isRevert) => {
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
  index,
}) => {
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(1000 / fps);
  encoder.setQuality(quality);
  encoder.setTransparent([0x00, 0x00, 0x00]);
  encoder.start();

  const totalSize = loopToInitialState ? imagesData.length * 2 : imagesData.length; // 1000
  const step = Number((totalSize / 100).toFixed(0)) || 1; // 10 every 10 iterations new percent

  const processFrames = (isRevert) => (i) => {
    if (i % step === 0) {
      const progress = isRevert ? 100 - (i / step) : i / step;
      postMessage({
        type: 'progress',
        payload: { id, progress },
      });
    }
    encoder.addFrame(imagesData[i], true);
  };

  times(index - 1, processFrames());

  if (loopToInitialState) {
    times(index - 1, processFrames(true), true);
  }

  postMessage({
    type: 'progress',
    payload: { id, progress: 100 },
  });

  encoder.finish();

  const output = encoder.getOutput();

  postMessage({
    type: 'result',
    payload: output,
  });
};

self.onmessage = function (msg) {
  const { type, payload } = msg.data;
  switch (type) {
    case 'start':
      handleStart(payload);
      break;
    case 'imageData':
      handleImageData(payload);
      break;
    default:
      throw 'Invalid type';
  }
};
