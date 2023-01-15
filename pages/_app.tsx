import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import Router from "next/router";
import { ChakraProvider } from "@chakra-ui/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "./index.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <title>
          Website Resmi Program Studi Sistem Informasi Fakultas Sains dan
          Teknologi UIN Raden Fatah Palembang
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2D3748" />
        <meta
          name="description"
          content="Website Resmi Program Studi Sistem Informasi Fakultas Sains dan Teknologi UIN Raden Fatah Palembang"
        />
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      </Head>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </React.Fragment>
  );
}
export default MyApp;
