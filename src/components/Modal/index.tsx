import { ReactNode } from "react";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

interface IModalProps {
  children: ReactNode;
  isVisible: boolean;
  setIsModalVisible: (arg: boolean) => void;
}

export const Modal = ({ children, isVisible, setIsModalVisible }: IModalProps) => {
  return (
    <div className={isVisible ? styles.overlay : styles.hidden}>
      <div className={styles.modalContainer}>
        <FiX onClick={ () => setIsModalVisible(false) } className={styles.closeButton} color="var(--red)" size={24} />
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};
