import React, { FC } from 'react';
// import {
// Switch, Route, Redirect,
// matchPath, useLocation,
// } from 'react-router-dom';
// import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { Tab } from '@components/Tab';
import { TabPointer } from '@components/TabPointer';

interface ITabs {
  items: [{
    name: string,
    route: string,
    render: () => any;
  }]
}

export const Tabs: FC<ITabs> = ({
  items = [],
}) => {
  const [animating, setAnimating] = React.useState(false);

  // @ts-ignore
  const tabRefs = items.reduce((acc, item) => {
    acc[item.route] = React.createRef();
    return acc;
  }, {});

  // const location = useLocation();
  const router = useRouter();

  // Find active path
  // const active = items.find((item) => matchPath(, {
  //   path: `/${item.route}`,
  //   exact: true,
  // }));
  const active = items.find((item) => router.asPath.includes(`/${item.route}`));

  const activeRoute = active && active.route;

  return (
    <>
      <div className="tabs">
        <ul role="tablist" aria-orientation="horizontal" className="tabs__list">
          {
            // @ts-ignore
            items.map((item) => (
              <Tab
                key={item.route}
                item={item}
                ref={tabRefs[item.route]}
                active={activeRoute === item.route}
                animating={animating}
                startAnimating={() => setAnimating(true)}
              />
            ))
}
        </ul>
        <TabPointer
          refs={tabRefs}
          activeRoute={activeRoute || ''}
          finishAnimating={() => setAnimating(false)}
          animating={animating}
        />
      </div>
      {/* <AnimatePresence exitBeforeEnter> */}
      {/*  <Switch location={location} key={location.pathname}> */}
      {/*    {items.map((item) => ( */}
      {/*      <Route */}
      {/*        key={item.route} */}
      {/*        path={`/${item.route}`} */}
      {/*        render={() => ( */}
      {/*          <motion.div */}
      {/*            initial={{ opacity: 0 }} */}
      {/*            animate={{ opacity: 1 }} */}
      {/*            exit={{ opacity: 0 }} */}
      {/*          > */}
      {/*            {item.render()} */}
      {/*          </motion.div> */}
      {/*        )} */}
      {/*      /> */}
      {/*    ))} */}
      {/*    /!* */}
      {/*      Need to wrap the redirect in a motion component with an "exit" defined */}
      {/*      https://www.framer.com/api/motion/animate-presence/#animating-custom-components */}
      {/*    *!/ */}
      {/*    <Route */}
      {/*      key="redirection" */}
      {/*      render={() => ( */}
      {/*        <motion.div exit={{ opacity: 0 }}> */}
      {/*          <Redirect to={items[0] ? `/${items[0].route}` : '/'} /> */}
      {/*        </motion.div> */}
      {/*      )} */}
      {/*    /> */}
      {/*  </Switch> */}
      {/* </AnimatePresence> */}
    </>
  );
};
