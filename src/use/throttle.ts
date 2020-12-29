import { useCallback } from 'react';
import throttle from 'lodash.throttle';

export const useThrottle = (
  callback: (...args: any) => void,
  wait: number = 100,
  deps: Array<any> = [],
) => useCallback(
  throttle(callback, wait),
  deps,
);
