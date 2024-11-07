"use client";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import { useUser } from "@/context/User/UserContext";
import {
  getUserCookieSession,
  setUserCookies,
} from "@/util/middleware/cookies";
import { redirect, useRouter } from "next/navigation";
import router from "next/router";
import Link from "next/link";

// type Props = {};

export default function SignInCard() {
  const router = useRouter();
  const { setUserInfo, setUserLoggedIn } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  console.log(loading);

  const handleUserCookie = async () => {
    const result = await getUserCookieSession();
    if (result) {
      router.push("/");
    }
  };

  useEffect(() => {
    handleUserCookie();
    const interval = setInterval(() => handleUserCookie(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleAuthenication = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    if (username && password) {
      const data = {
        req_username: username,
        req_password: password,
      };

      const res = await fetch("/api/sign-in", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = res.json();
      if (res.ok) {
        const data = await result;
        const userData = data.body;
        console.log(userData);
        if (userData) {
          setUserCookies(userData);
          setUserInfo(userData);
          setUserLoggedIn(true);
          router.push("/");
        }
      }
    }
    setUsername("");
    setPassword("");
    setLoading(false);
  };

  return (
    <>
      <form className="max-w-md mx-auto bg-black p-10 rounded-lg border-red-900 border-4">
        <div className="relative z-0 w-full mb-5 group">
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-2xl font-mono  text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="username"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="cybernet1"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-2xl font-mono text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg font-mono w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={handleAuthenication}
          disabled={loading}
        >
          {!loading ? "Submit" : "loading..."}
        </button>

        <div className="py-2">
          <p className="text-gray-600">
            {"Don't have an account?"}{" "}
            <Link href="/sign-up">Register Here</Link>
          </p>
        </div>
      </form>
    </>
  );
}
