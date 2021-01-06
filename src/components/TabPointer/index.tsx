import {
  FC, useCallback, useEffect, useState,
} from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';

interface ITabPointer {
  refs: {
    [id: string]: HTMLSpanElement,
  },
  activeId: string;
  finishAnimating: () => void;
  animating: boolean;
  tabCounter: number;
}

export const TabPointer: FC<ITabPointer> = ({
  refs,
  activeId,
  finishAnimating,
  animating,
  tabCounter,
}) => {
  const [{ x, width }, setAttributes] = useState({ x: 0, width: 0 });

  const updateAttributes = useCallback(() => {
    if (activeId && refs?.[activeId]) {
      setAttributes({
        x: refs[activeId].offsetLeft,
        width: refs[activeId].getBoundingClientRect().width,
      });
    }
  }, [activeId, refs]);

  useEffect(() => {
    updateAttributes();
  }, [activeId, refs, updateAttributes, tabCounter]);

  useEffect(() => {
    const recalculateAttrs = debounce(() => {
      updateAttributes();
    }, 500);

    window.addEventListener('resize', recalculateAttrs);
    return () => {
      window.removeEventListener('resize', recalculateAttrs);
    };
  });

  return (
    <motion.div
      className="tab-pointer"
      animate={{
        x,
        width,
      }}
      style={{
        opacity: animating ? 1 : 0,
      }}
      onAnimationComplete={finishAnimating}
    />
  );
};
