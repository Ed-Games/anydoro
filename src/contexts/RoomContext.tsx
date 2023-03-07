import { onValue, ref, set } from "firebase/database";
import { useRouter } from "next/router";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IRoom } from "../interfaces/Room";
import { IUser } from "../interfaces/User";
import { database } from "../services/firebase";
import { uuidv4 } from "@firebase/util";
import { Mode, NotificationType, Time } from "../enums";
import { ITimerOptions } from "../interfaces/timerOptions";
import { useNotification } from "../hooks/useNotification";

interface IRoomContextProps {
  children: ReactNode;
}

interface IRoomContextProvider {
  timerOptions: string | undefined;
  room: IRoom | undefined;
  hasRoomLoaded: boolean;
  hasRoomClosed: boolean;
  setHasRoomClosed: (arg: boolean) => void;
  handleCreateRoom: (name: string, user: IUser) => Promise<void>;
  handleCloseRoom: () => Promise<void>;
  handleLoadRoomAndAddUser: (user: IUser) => void;
  handleSetRoomTimer: (
    time: number,
    mode: string,
    isActive: boolean
  ) => Promise<void>;
  handleSetRoomTimerOptions: (timerOptions: ITimerOptions) => Promise<void>;
}

export const RoomContext = createContext({} as IRoomContextProvider);

export const RoomContextProvider = ({ children }: IRoomContextProps) => {
  const [room, setRoom] = useState<IRoom>();
  const [hasRoomLoaded, setHasRoomLoaded] = useState<boolean>(false);
  const [hasRoomClosed, setHasRoomClosed] = useState<boolean>(false);
  const [roomTimerOptions, setRoomTimerOptions] = useState<ITimerOptions>();
  const router = useRouter();
  const { handleCreateNotification } = useNotification();

  const timerOptions = useMemo(() => {
    if (roomTimerOptions) {
      return JSON.stringify(roomTimerOptions);
    } else {
      return;
    }
  }, [roomTimerOptions]);

  const handleCreateRoom = async (name: string, user: IUser) => {
    try {
      const roomRef = ref(database, "rooms/" + uuidv4());
      await set(roomRef, {
        name,
        adminId: user.id,
        createdAt: Date.now(),
        pomodoro: Time.POMODORO,
        longBreak: Time.LONGBREAK,
        shortBreak: Time.SHORTBREAK,
        currentTimerValue: Time.POMODORO,
        currentTimerMode: Mode.POMODORO,
        isActive: false,
      });
      router.push(`/rooms/${roomRef.key}`);
    } catch (error) {
      handleCreateNotification({
        message: "Houve um erro ao tentar criar a sala.",
        type: NotificationType.ERROR,
      });
    }
  };

  const handleLoadRoomAndAddUser = useCallback(
    (user: IUser) => {
      const roomRef = ref(database, `rooms/${router.query.slug}`);
      onValue(roomRef, async (snapshot) => {
        const localRoom: IRoom = snapshot.val();
        if (localRoom) {
          if (localRoom.endedAt) {
            setHasRoomClosed(true);
            router.push("/");
          }

          const usersInRoom = localRoom.users
            ? Array.from(localRoom.users)
            : new Array<IUser>();

          const alreadyexists = usersInRoom.find(
            (userInRoom) => userInRoom.id === user!.id
          );

          if (!alreadyexists) {
            const userRef = ref(
              database,
              `rooms/${router.query.slug}/users/${user!.id}`
            );
            await set(userRef, {
              ...user,
              isAdmin: localRoom.adminId === user!.id,
            });
          }

          setRoomTimerOptions({
            longBreak: localRoom.longBreak,
            pomodoro: localRoom.pomodoro,
            shortBreak: localRoom.shortBreak,
          });

          setRoom(localRoom);
          setHasRoomLoaded(true);
        } else {
          router.push("/");
          handleCreateNotification({
            message: "Sala não encontrada",
            type: NotificationType.ERROR,
          });
        }
      });
    },
    [handleCreateNotification, router]
  );

  const handleCloseRoom = async () => {
    const roomRef = ref(database, `rooms/${router.query.slug}`);
    await set(roomRef, { ...room, endedAt: Date.now() });
    setHasRoomClosed(true);
  };

  const handleSetRoomTimer = useCallback(
    async (time: number, mode: string, isActive: boolean) => {
      const roomRef = ref(database, `rooms/${router.query.slug}`);
      if (room?.endedAt) {
        return;
      }
      room?.currentTimerMode &&
        (await set(roomRef, {
          ...room,
          currentTimerValue: time,
          currentTimerMode: mode,
          isActive,
        }));
    },
    [room, router]
  );

  const handleSetRoomTimerOptions = async (timerOptions: ITimerOptions) => {
    const roomRef = ref(database, `rooms/${router.query.slug}`);
    await set(roomRef, { ...room, ...timerOptions });
  };

  useEffect(() => {
    if (hasRoomClosed) {
      setRoom(undefined);
      setHasRoomLoaded(false);
      setHasRoomClosed(false);
      setRoomTimerOptions(undefined);
    }
  }, [hasRoomClosed]);

  return (
    <RoomContext.Provider
      value={{
        room,
        hasRoomLoaded,
        hasRoomClosed,
        timerOptions,
        setHasRoomClosed,
        handleCreateRoom,
        handleLoadRoomAndAddUser,
        handleCloseRoom,
        handleSetRoomTimer,
        handleSetRoomTimerOptions,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
