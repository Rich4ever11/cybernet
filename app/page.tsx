"use client";

import Image from "next/image";
import NavBar from "@/components/Navbar/NavBar";
import { useUser } from "@/context/User/UserContext";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/navigation";

export default function Home() {
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
    <div className="bg-black min-h-screen h-full grid font-[family-name:var(--font-geist-sans)]">
      <NavBar username={userData.username || "Loading..."} />
      {/* <p className="text-white">{userData ? userData.username : "None"}</p> */}
    </div>
  );
}
