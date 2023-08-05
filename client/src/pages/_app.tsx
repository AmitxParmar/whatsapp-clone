import "@/styles/globals.css";
import Head from "next/head";
import { AppProps } from "next/app";

import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

/* import { StateProvider } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReducers"; */

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Head>
          <title>Whatsapp</title>
          <link rel="shortcut icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
