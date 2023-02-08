import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { RoomContextProvider } from "../contexts/RoomContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RoomContextProvider>
        <Component {...pageProps} />
        <ToastContainer />
      </RoomContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
