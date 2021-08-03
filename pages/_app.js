import Router from 'next/router';
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import './index.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps}>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Component>
    </ChakraProvider>
  );
}
export default MyApp;
