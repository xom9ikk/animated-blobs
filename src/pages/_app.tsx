import { wrapper } from '@store/configureStore';
import '../styles/index.scss';

const App = ({ Component, pageProps }: any) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(App);
