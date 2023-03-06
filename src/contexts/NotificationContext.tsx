import { createContext, ReactNode, useState } from "react";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

interface IProps {
  children: ReactNode;
}

enum NotificationType {
  WARNING,
  SUCCESS,
  ERROR,
}

export const NotificationContext = createContext({});

export const NotificationContextProvider = ({ children }: IProps) => {
  const handleShowNotification = (
    message: string,
    type: NotificationType,
    opts?: ToastOptions<{}>
  ) => {
    switch (type) {
      case NotificationType.ERROR:
        toast.error(message, opts);
      case NotificationType.WARNING:
        toast.warning(message, opts);
      case NotificationType.SUCCESS:
        toast.success(message, opts);
    }
  };

  return (
    <NotificationContext.Provider value={{ handleShowNotification }}>
      {children}
      <ToastContainer />
    </NotificationContext.Provider>
  );
};
