import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { FiPower, FiShare2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { CloseRoom } from "../CloseRoom";
import styles from "./styles.module.scss";

const Header: NextPage = () => {
  const [isCloseModalVisible, setIsCloseModalVisible] =
    useState<boolean>(false);
  const router = useRouter();

  const copyRoomCodeToClipBoard = () => {
    navigator.clipboard.writeText(router.query.slug as string);
    toast.success("Código da sala copiado com sucesso!");
  };

  return (
    <div className={styles.header}>
      <button onClick={copyRoomCodeToClipBoard}>Compartilhar</button>
      <button onClick={() => setIsCloseModalVisible(true)}>
        Encerrar sala
      </button>

      <FiShare2 size={24} color="var(--purple)" onClick={copyRoomCodeToClipBoard} />
      <FiPower size={24} color="var(--red)" onClick={() => setIsCloseModalVisible(true)} />
      { isCloseModalVisible && createPortal(
        <CloseRoom
          isVisible={isCloseModalVisible}
          setIsVisible={setIsCloseModalVisible}
        />,
        document.getElementById('room')!
      )}
    </div>
  );
};

export default Header;
