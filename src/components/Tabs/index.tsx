import React, {
  FC, ReactElement, useEffect, useRef,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TabPointer } from '@components/TabPointer';

interface ITabs {
  activeId: string;
  onChange: (id: string) => void;
}

export const Tabs: FC<ITabs> = ({
  activeId: initialActiveId,
  onChange,
  children,
}) => {
  const [animating, setAnimating] = React.useState(false);
  const [activeId, setActiveId] = React.useState(initialActiveId);

  useEffect(() => {
    console.log('activeBlobId', initialActiveId);
    setActiveId(initialActiveId);
  }, [initialActiveId]);

  const tabRefs = useRef<any>({});

  React.Children.forEach(children, (child: ReactElement) => {
    tabRefs.current[child.props.id] = React.createRef();
  });

  const handleTabClick = (id: string, isDisabled?: boolean) => {
    if (!isDisabled) {
      setActiveId(id);
    }
    onChange(id);
  };

  const handleStartAnimating = () => setAnimating(true);

  const handleFinishAnimating = () => setAnimating(false);

  return (
    <>
      <div className="tabs">
        <ul role="tablist" aria-orientation="horizontal" className="tabs__list">
          {React.Children.map(children, (child: ReactElement) => (
            React.cloneElement(
              child,
              {
                ...child.props,
                children: null,
                isActive: activeId === child.props.id,
                ref: (ref) => {
                  tabRefs.current[child.props.id] = ref;
                },
                onClick: handleTabClick,
                startAnimating: handleStartAnimating,
              },
            )
          ))}
        </ul>
        <TabPointer
          refs={tabRefs.current}
          activeId={activeId}
          finishAnimating={handleFinishAnimating}
          animating={animating}
          tabCounter={Object.keys(tabRefs.current).length}
        />
      </div>
      <div className="tabs__content">
        <AnimatePresence exitBeforeEnter>
          {React.Children.map(children, (child: ReactElement) => (
            activeId === child.props.id && (
              <motion.div
                key={`tab-content-${child.props.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {child.props.children}
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};
