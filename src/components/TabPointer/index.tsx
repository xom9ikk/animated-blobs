import React, { FC, useEffect } from 'react';
import { motion } from 'framer-motion';
import debounce from 'lodash.debounce';

interface ITabPointer {
  refs: Array<{
    current?: {
      offsetLeft: number;
      getBoundingClientRect: () => void;
    }
  }>,
  previousRoute?: string;
  activeRoute: string;
  finishAnimating: () => void;
  animating: boolean;
}

export const TabPointer: FC<ITabPointer> = ({
  refs,
  activeRoute,
  finishAnimating,
  animating,
}) => {
  const [{ x, width }, setAttributes] = React.useState({
    x: 0,
    width: 0,
  });

  const updateAttributes = React.useCallback(() => {
    // @ts-ignore
    if (refs && activeRoute && refs[activeRoute]) {
      setAttributes({
        // @ts-ignore
        x: refs[activeRoute].current.offsetLeft,
        // @ts-ignore
        width: refs[activeRoute].current.getBoundingClientRect().width,
      });
    }
  }, [activeRoute, refs]);

  // Update attributes if active route changes (or refs change)
  useEffect(() => {
    updateAttributes();
  }, [activeRoute, refs, updateAttributes]);

  // After window resize, recalculate
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
