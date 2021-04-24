import { ChakraProvider } from "@chakra-ui/react";
import './index.css';

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
