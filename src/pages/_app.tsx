import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { SystemActions } from '@store/actions';
import { wrapper } from '@store/configureStore';
import { useUtils } from '@use/utils';
import '../styles/index.scss';

const { getRandomInt } = useUtils();

const App = ({ Component, pageProps }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SystemActions.addBlob());
    dispatch(SystemActions.setBackgroundSrc(`/svg/wave-${getRandomInt(0, 6)}.svg`));
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
