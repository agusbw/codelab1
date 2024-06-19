"use client";

import React from "react";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import firebase_app from "../firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext<{ user: User | null }>({
  user: null,
});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = React.useState<null | User>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div className="lg:px-24 px-4 mt-12">Loading...</div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
