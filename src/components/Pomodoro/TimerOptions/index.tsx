import { Modal } from "../../Modal";
import styles from "./styles.module.scss";

interface ITImerOptionsProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export const TimerOptions = ({
  isVisible,
  setIsVisible,
}: ITImerOptionsProps) => {
  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      <div className={styles.content}>
        <h3>Configurar Timer</h3>
        <div className="row-wrapper">
          <div className="column-wrapper">
            <span>Pomodoro</span>
            <input type="number" />
          </div>
          <div className="column-wrapper">
            <span>Short Break</span>
            <input type="number" />
          </div>
          <div className="column-wrapper">
            <span>Long Break</span>
            <input type="number" />
          </div>
        </div>
      </div>
    </Modal>
  );
};
