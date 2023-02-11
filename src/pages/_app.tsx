import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { RoomContextProvider } from "../contexts/RoomContext";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RoomContextProvider>
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <Component {...pageProps} />
        <ToastContainer />
      </RoomContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
