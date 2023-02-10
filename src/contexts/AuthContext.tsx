import { GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { IUser } from "../interfaces/User";
import { auth } from "../services/firebase";

interface IAuthContext {
  user?: IUser | null;
  signInWithGoogle: () => Promise<void>;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext);

export const AuthContextProvider = ({
  children,
}: IAuthContextProviderProps) => {
  const [user, setUser] = useState<IUser | null | undefined>();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    handleValidateAndSetUser(result.user);
  };

  const handleValidateAndSetUser = (user: User | null) => {
    if (user) {
      const { displayName, photoURL, uid } = user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      handleValidateAndSetUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};
