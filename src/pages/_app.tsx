import ReactTooltip from 'react-tooltip';
import { wrapper } from '@store/configureStore';
import '../styles/index.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SystemActions } from '@store/actions';
import { useUtils } from '@use/utils';

const App = ({ Component, pageProps }: any) => {
  const dispatch = useDispatch();
  const { getRandomInt } = useUtils();

  useEffect(() => {
    dispatch(SystemActions.addBlob());
    dispatch(SystemActions.setBackgroundSrc(`/svg/wave-${getRandomInt(0, 6)}.sv`));
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
