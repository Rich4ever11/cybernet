"use client";

import NavBar from "./NavBar";
import { useUser } from "@/context/User/UserContext";
import { useEffect, useState } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/navigation";

export default function NavBarAuth() {
  const router = useRouter();
  const { userInfo, userLoggedIn } = useUser();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const handleUserCookie = async () => {
    console.log(userLoggedIn);
    const result = await getUserCookieSession();
    if (result) {
      const userInfo = result.userData;
      console.log(userInfo);
      setUserData(userInfo);
    } else {
      router.push("/sign-in");
    }
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
