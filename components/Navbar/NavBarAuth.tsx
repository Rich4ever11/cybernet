"use client";

import NavBar from "./NavBar";
import { useUser } from "@/context/User/UserContext";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/navigation";

type NavBarProp = {
  setLoadingStatus: Dispatch<SetStateAction<boolean>>;
};

export default function NavBarAuth({ setLoadingStatus }: NavBarProp) {
  const router = useRouter();
  const { userInfo, userLoggedIn } = useUser();
  const [userData, setUserData] = useState<any>({});
  const handleUserCookie = async () => {
    const result = await getUserCookieSession();
    if (result) {
      const userInfo = result.userData;
      setUserData(userInfo);
      setLoadingStatus(false);
      return;
    }
    router.push("/sign-in");
  };
  useEffect(() => {
    handleUserCookie();
  }, []);

  return (
    <div className="bg-black">
      {userData && <NavBar username={userData.username || "Loading..."} />}
    </div>
  );
}
