import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { useRoom } from "./useRoom";

export const useIsAdmin = () => {
  const { room } = useRoom();
  const { user } = useAuth();

  const isAdmin = useMemo(
    () => room?.adminId === user?.id,
    [room?.adminId, user?.id]
  );

  return isAdmin;
};
