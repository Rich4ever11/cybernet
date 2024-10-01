"use client";
import {
  getUserCookieSession,
  setUserCookies,
} from "@/util/middleware/cookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function SignUpCard({}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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

  function validateEmail(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleAccountCreation = async (event: any) => {
    setLoading(true);
    event.preventDefault();
    if (
      username &&
      password &&
      firstName &&
      lastName &&
      email &&
      validateEmail(email)
    ) {
      const data = {
        req_username: username,
        req_password: password,
        req_firstName: firstName,
        req_lastName: lastName,
        req_email: email,
      };

      const res = await fetch("/api/sign-up", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const result = res.json();
      if (res.ok) {
        console.log("OK");
        // const cookies_data = {
        //   username: username,
        //   firstName: firstName,
        //   lastName: lastName,
        //   email: email,
        // };
        // setUserCookies(cookies_data);
        router.push("/sign-in");
      }
    }
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setLoading(false);
  };

  return (
    <>
      <form className="max-w-md mx-auto bg-black p-10 rounded-lg border-red-900 border-4">
        <div className="relative z-0 w-full mb-5 group">
          <div className="flex flex-nowrap space-x-4">
            <div className="mb-5">
              <label
                htmlFor="firstName"
                className="block mb-2 text-2xl font-mono  text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="firstName"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                onChange={(event) => setFirstName(event.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-2xl font-mono  text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="lastName"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                onChange={(event) => setLastName(event.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-2xl font-mono  text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@cybernet.com"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

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
          onClick={handleAccountCreation}
          disabled={loading}
        >
          {!loading ? "Submit" : "loading..."}
        </button>
        <div className="py-2">
          <p className="text-gray-600">
            Already have an account? <Link href="/sign-in">Login Here</Link>
          </p>
        </div>
      </form>
    </>
  );
}
