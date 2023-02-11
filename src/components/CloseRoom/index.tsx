import { useRoom } from "../../hooks/useRoom";
import { Modal } from "../Modal";
import styles from './styles.module.scss';

interface ICloseRoomProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export const CloseRoom = ({
  isVisible,
  setIsVisible,
}: ICloseRoomProps) => {

  const { handleCloseRoom } = useRoom();

  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      <h2>Encerrar sala?</h2>
      <span>Tem certeza que deseja encerrar essa sala?</span>
      <div className={styles.btnContainer}>
        <button onClick={() => setIsVisible(false) }>Não, cancelar</button>
        <button onClick={handleCloseRoom}>Sim, encerrar</button>
      </div>
    </Modal>
  );
};
