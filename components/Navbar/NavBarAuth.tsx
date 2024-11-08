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
    const result = await getUserCookieSession();
    console.log(result);
    if (result) {
      const userInfo = result.userData;
      setUserData(userInfo);
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
