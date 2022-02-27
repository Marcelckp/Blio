import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import { store } from '../redux/store';
import { CreatePostIcon, Footer, Nav } from '../Components';

function MyApp({ Component, pageProps }: AppProps) {
  const user = store.getState().user.user
  return (
    <Provider store={store}>
      <Nav />
      <Component  {...pageProps} />
      { user && <CreatePostIcon />}
      <Footer />
    </Provider>
  )
}

export default MyApp;
