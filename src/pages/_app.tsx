import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import { RoomContextProvider } from "../contexts/RoomContext";
import { TimerContextProvider } from "../contexts/timerContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <RoomContextProvider>
        <TimerContextProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </TimerContextProvider>
      </RoomContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
