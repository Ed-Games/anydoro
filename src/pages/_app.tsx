import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthContextProvider } from "../contexts/AuthContext";
import { RoomContextProvider } from "../contexts/RoomContext";
import { TimerContextProvider } from "../contexts/timerContext";
import { NotificationContextProvider } from "../contexts/NotificationContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <RoomContextProvider>
          <TimerContextProvider>
            <Component {...pageProps} />
          </TimerContextProvider>
        </RoomContextProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  );
}

export default MyApp;
