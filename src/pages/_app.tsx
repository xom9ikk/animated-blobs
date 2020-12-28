import ReactTooltip from 'react-tooltip';
import { wrapper } from '@store/configureStore';
import '../styles/index.scss';
import { useEffect } from 'react';

const App = ({ Component, pageProps }: any) => {
  useEffect(() => {
    const interval = setInterval(() => {
      ReactTooltip.rebuild(); // TODO: fix
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <ReactTooltip
        id="tooltip"
        place="top"
        effect="solid"
        multiline
        arrowColor="transparent"
        overridePosition={({ left, top }) => ({ left, top })}
      />
    </>
  );
};

export default wrapper.withRedux(App);
