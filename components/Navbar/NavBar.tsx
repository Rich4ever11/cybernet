"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { GiConsoleController, GiCyberEye } from "react-icons/gi";
import { logout } from "@/util/middleware/cookies";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

export default function NavBar({ username }: Props) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showPagesMenu, setShowPagesMenu] = useState(false);

  function handleProfileMenu(event: any): void {
    setShowUserMenu(!showUserMenu);
  }

  function showPathsMenu(event: any): void {
    console.log("Hello World!");
    setShowPagesMenu(!showPagesMenu);
  }

  return (
    <div>
      <nav className="border-gray-200 bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button
            className="flex items-center space-x-3 rtl:space-x-reverse"
            onClick={(event) => showPathsMenu(event)}
          >
            <GiCyberEye color={"white"} size={42} />{" "}
            <p className="pl-2 text-white">CYBERNET AI</p>
          </button>

          {username !== "Loading..." ? (
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="px-8 text-gray-50">
                <p>{username}</p>
              </div>
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
                onClick={handleProfileMenu}
              >
                <Image
                  className="rounded-full"
                  src={
                    "https://i.pinimg.com/736x/34/42/83/34428331e26a3ff908f4e852709249a5.jpg"
                  }
                  alt=""
                  width={24}
                  height={24}
                ></Image>
              </button>
            </div>
          ) : (
            <></>
          )}

          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-900 border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 md:dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/red-team-ai"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0   md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Cybernet AI
                </Link>
              </li>
              <li>
                <Link
                  href="/documents"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Documents
                </Link>
              </li>

              <li>
                <Link
                  href="/notes"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Notes
                </Link>
              </li>

              <li>
                <Link
                  href="/ai_notes"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  AI Notes
                </Link>
              </li>

              <li>
                <Link
                  href="/blue-team-tools"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Blue Team Tools
                </Link>
              </li>

              <li>
                <a
                  href="/red-team-tools"
                  className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Red Team Tools
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {showUserMenu && username !== "Loading..." ? (
        <div
          className="absolute right-0 z-10 mt-2 w-48 mr-0 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <a
            className="block px-4 py-2 text-sm text-white"
            role="menuitem"
            id="user-menu-item-1"
            href="/documents"
          >
            Documents
          </a>
          <a
            className="block px-4 py-2 text-sm text-white"
            role="menuitem"
            id="user-menu-item-2"
          >
            <button
              onClick={() => {
                logout();
                router.push("/sign-in");
              }}
            >
              Sign out
            </button>
          </a>
        </div>
      ) : (
        <></>
      )}

      {showPagesMenu && username !== "Loading..." ? (
        <div
          className="absolute left-2 z-10 mt-2 w-48 mr-44 origin-top-left rounded-md bg-black py-1 shadow-lg ring-1 ring-white ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
        >
          <a className="block px-4 py-2 text-sm text-white" href="/">
            Home
          </a>

          <a className="block px-4 py-2 text-sm text-white" href="/documents">
            Documents
          </a>

          <a className="block px-4 py-2 text-sm text-white" href="/red-team-ai">
            Cybernet AI
          </a>

          <a className="block px-4 py-2 text-sm text-white" href="/notes">
            Notes
          </a>

          <a className="block px-4 py-2 text-sm text-white" href="/ai_notes">
            AI Notes
          </a>

          <a
            className="block px-4 py-2 text-sm text-white"
            href="/blue-team-tools"
          >
            Blue Team Tools
          </a>

          <a
            className="block px-4 py-2 text-sm text-white"
            href="/red-team-tools"
          >
            Red Team Tools
          </a>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
