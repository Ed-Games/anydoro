import Image from "next/image";
import { useEffect, useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import { IUser } from "../../interfaces/User";
import styles from "./styles.module.scss";

export const Board = () => {
  const { room } = useRoom();
  const [users, setusers] = useState<IUser[]>();

  useEffect(() => {
    if (room?.users) {
      const parsedusers = Object.keys(room.users).map(
        (key) => room.users[key as any]
      );

      setusers(parsedusers);
    }
  }, [room?.users]);

  return (
    <aside className={styles.boardContainer}>
      <div className={styles.tabs}>
        <button className={styles.selected} type="button">
          Tarefas
        </button>
        <button type="button">Equipe</button>
        <button type="button">chat</button>
      </div>
      <div className={styles.line} />
      <ul className={styles.usersList}>
        {users?.map((user) => (
          <li key={user.id}>
            {user.avatar ? (
              <div className={styles.avatar}>
                <Image
                  layout="fill"
                  src={user.avatar}
                  alt={`imagem avatar do usuário ${user.name}`}
                />
              </div>
            ) : (
              <div className={styles.avatarPlaceholder}>{user.name[0]}</div>
            )}

            <div className={styles.userInfo}>
              <span>{user.name}</span>
              <p>{user.isAdmin ? "Admin" : "Membro"}</p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};
