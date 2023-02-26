import { useRouter } from "next/router";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { useRoom } from "../../hooks/useRoom";
import { useTimer } from "../../hooks/useTimer";
import { Modal } from "../Modal";
import styles from "./styles.module.scss";

interface ICloseRoomProps {
  isVisible: boolean;
  setIsVisible: (arg: boolean) => void;
}

export const CloseRoom = ({ isVisible, setIsVisible }: ICloseRoomProps) => {
  const { handleCloseRoom } = useRoom();
  const { resetTimer } = useTimer();
  const router = useRouter();
  const isAdmin = useIsAdmin();

  const handleLeaveRoom = () => {
    router.push("/");
  };

  const handleClickConfirmButton = () => {
    isAdmin ? handleCloseRoom() : handleLeaveRoom();
    resetTimer();
  };
  return (
    <Modal isVisible={isVisible} setIsModalVisible={setIsVisible}>
      <h2>{isAdmin? "Encerrar" : "Sair dessa"} sala?</h2>
      <span>Tem certeza que deseja { isAdmin? "encerrar essa" : "sair dessa"} sala?</span>
      <div className={styles.btnContainer}>
        <button onClick={() => setIsVisible(false)}>Não, cancelar</button>
        <button onClick={handleClickConfirmButton}>Sim, {isAdmin? "encerrar" : "sair"}</button>
      </div>
    </Modal>
  );
};
