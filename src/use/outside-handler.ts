import { BaseSyntheticEvent, useEffect } from 'react';

export const useOutsideHandler = (ref: any, handler: (e: BaseSyntheticEvent) => void) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      handler(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};
