"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {};

const UserContext = createContext<any>({});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [loading, setLoading] = useState();

  const value = {
    userInfo,
    setUserInfo,
    userLoggedIn,
    setUserLoggedIn,
    setLoading,
    loading,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
