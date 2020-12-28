import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Tab } from '@components/Tab';
import { TabPointer } from '@components/TabPointer';

interface ITabs {
  items: Array<{
    name: string,
    route: string,
    render: () => any;
  }>
}

export const Tabs: FC<ITabs> = ({
  items = [],
}) => {
  const [animating, setAnimating] = React.useState(false);

  const tabRefs = items.reduce((acc, item) => {
    // @ts-ignore
    acc[item.route] = React.createRef();
    return acc;
  }, {});

  const router = useRouter();

  const activeTab = items.find((item) => router.asPath === `/${item.route}`);

  const activeRoute = activeTab && activeTab.route;

  return (
    <>
      <div className="tabs">
        <ul role="tablist" aria-orientation="horizontal" className="tabs__list">
          {
            items.map((item) => (
              <Tab
                key={item.route}
                item={item}
                // @ts-ignore
                ref={tabRefs[item.route]}
                isActive={activeRoute === item.route}
                animating={animating}
                startAnimating={() => setAnimating(true)}
              />
            ))
          }
        </ul>
        <TabPointer
          // @ts-ignore
          refs={tabRefs}
          activeRoute={activeRoute || ''}
          finishAnimating={() => setAnimating(false)}
          animating={animating}
        />
      </div>
      <div style={{ width: '100%' }}>
        <AnimatePresence exitBeforeEnter>
          {
            items.map((item) => {
              const isActive = activeRoute === item.route;
              return isActive && (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {item.render()}
              </motion.div>
              );
            })
          }
        </AnimatePresence>
      </div>
    </>
  );
};
