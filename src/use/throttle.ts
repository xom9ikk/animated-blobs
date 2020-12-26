import { useCallback } from 'react';
import throttle from 'lodash.throttle';

export const useThrottle = (
  callback: (...args: any) => void,
  wait: number = 100,
) => useCallback(
  throttle(callback, wait),
  [],
);
