"use client";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {};

const UserContext = createContext<any>({});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();
  const [loading, setLoading] = useState();

  const value = {};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
