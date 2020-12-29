import { BaseSyntheticEvent, useEffect } from 'react';

type IUseEventListener = (
  event: string,
  callback: (e: BaseSyntheticEvent | KeyboardEvent) => void,
  keyCode?: string,
) => void;

export const useEventListener: IUseEventListener = (
  event, callback, keyCode,
) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (keyCode) {
        if (e.code === keyCode) {
          callback(e);
        }
      } else {
        callback(e);
      }
    };
    document.addEventListener(event, handleKeydown);
    return () => document.removeEventListener(event, handleKeydown);
  }, []);
};
