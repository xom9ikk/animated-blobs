import { useEffect, useState } from 'react';

const MAX_BLOB_SIZE = 440;
const STEP = 25;
const BREAKPOINT_FACTOR = 0.1;
const MIN_BREAKPOINT_VALUE = 200;
const HEADER_HEIGHT = 160;
const CONTROLS_HEIGHT = 62;

const generateBreakpoints = (height: number) => {
  const maxValue = Math.ceil(height - (HEADER_HEIGHT + CONTROLS_HEIGHT));
  const arraySize = Math.ceil((maxValue - MIN_BREAKPOINT_VALUE) / STEP);

  return new Array(arraySize > 0 ? arraySize : 5)
    .fill(0)
    .map((value, index) => index)
    .map((value) => value * STEP + MIN_BREAKPOINT_VALUE)
    .reverse();
};

const generateBlobSizes = (breakPoints: Array<number>) => breakPoints
  .map((value) => value - value * BREAKPOINT_FACTOR);

export const useBlobSize = () => {
  const [blobSize, setBlobSize] = useState(0);

  function getBlobSizeForWidth(width: number, height: number) {
    const breakPoints = generateBreakpoints(height);
    const blobSizes = generateBlobSizes(breakPoints);

    const index = breakPoints.findIndex((breakPoint) => breakPoint <= width);

    if (index === -1) {
      return blobSizes[blobSizes.length - 1] > MAX_BLOB_SIZE
        ? MAX_BLOB_SIZE
        : blobSizes[blobSizes.length - 1];
    }

    return blobSizes[index] > MAX_BLOB_SIZE
      ? MAX_BLOB_SIZE
      : blobSizes[index];
  }

  useEffect(() => {
    setBlobSize(getBlobSizeForWidth(window.innerWidth, window.innerHeight));

    const handleResize = () => {
      setBlobSize(getBlobSizeForWidth(window.innerWidth, window.innerHeight));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    blobSize,
  };
};
