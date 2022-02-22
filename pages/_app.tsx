import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { Footer, Nav } from '../Components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Nav />
      <Component  {...pageProps} />
      <Footer />
    </Provider>
  )
}

export default MyApp;
