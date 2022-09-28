import "../styles/globals.css";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { Provider } from "react-redux";
import { store } from "../store";
import AuthProvider from "../components/layouts/AuthProvider";
import { Toaster } from "react-hot-toast";
import NProgress from "nprogress";

// progress bar
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});

Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});

Router.events.on("routeChangeError", () => {
  NProgress.done();
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <Provider store={store}>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </Provider>

      <Toaster />
    </>
  );
}

NProgress.configure({ showSpinner: false });
