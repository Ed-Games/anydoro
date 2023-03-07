import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";
import { NotificationType } from "../enums";

interface IProps {
  children: ReactNode;
}

interface INotificationProvider {
  handleCreateNotification: (notification: INotification) => void;
}

interface INotification {
  message: string;
  type: NotificationType;
  opts?: ToastOptions<{}>;
}

export const NotificationContext = createContext({} as INotificationProvider);

export const NotificationContextProvider = ({ children }: IProps) => {
  const [isShowingNotification, setIsShowingNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification>();

  const handleCreateNotification = useCallback((notification: INotification) => {
    if (!isShowingNotification) {
      setNotification(notification);
      setIsShowingNotification(true);
    }
  }, [isShowingNotification])

  useEffect(() => {
    if (isShowingNotification && notification) {
      switch (notification.type) {
        case NotificationType.ERROR:
          toast.error(notification.message, notification.opts);
          break;
        case NotificationType.WARNING:
          toast.warning(notification.message, notification.opts);
          break;
        case NotificationType.SUCCESS:
          toast.success(notification.message, notification.opts);
          break;
      }

      setIsShowingNotification(false);
      setNotification(undefined);
    }
  }, [
    notification,
    isShowingNotification,
  ]);

  return (
    <NotificationContext.Provider value={{ handleCreateNotification }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
