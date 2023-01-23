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
      <form className={styles.content}>
        <h3>Configurar Timer</h3>
        <div className={`row-wrapper ${styles.InputContainer}`}>
          <div className="column-wrapper">
            <span>Pomodoro</span>
            <input type="time" />
          </div>
          <div className="column-wrapper">
            <span>Short Break</span>
            <input type="time" />
          </div>
          <div className="column-wrapper">
            <span>Long Break</span>
            <input type="time" />
          </div>
        </div>

        <div className={`row-wrapper ${styles.btnContainer}`}>
          <button>Cancelar</button>
          <button>Salvar</button>
        </div>

      </form>
    </Modal>
  );
};
