"use client";

import React, { useState } from "react";
import { MdAttachEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { FaLock } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

type Props = {};

export default function BreachSearch({}: Props) {
  const [keywordSearch, setKeywordSearch] = useState("");
  const [breachData, setBreachData] = useState([]);
  const [resultMessage, setResultMessage] = useState("");

  const iconColor = "#ff554c";
  const iconSize = 32;
  const result = [
    {
      email: "someone@example.com",
      hash_password: true,
      password: "$1$Ny****************",
      sha1: "44fc217f3211350e797486c6838d2579ae4af31e",
      hash: "d5KR3+a4xxgBxNHxHi2Yfb3FZKJ5GDH/qocuT8rag9FCQN/V",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "*******",
      sha1: "d4fe581561f18ee5006254a7e53f53cbed780bc2",
      hash: "Zkz6Dt75nlKSuB2Or+b6ybPeasYqZA==",
      sources: ["Gameshot.net"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
    {
      email: "someone@example.com",
      hash_password: true,
      password: "0000",
      sha1: "39dfa55283318d31afe5a3ff4a0e3253e2045e43",
      hash: "i/6FUWuW+BWVYX6mMfpVEqnEcNw=",
      sources: ["Unknown"],
    },
  ];

  const handleBreachSearch = async () => {
    const data = {
      searchValue: keywordSearch,
    };

    const res = await fetch("/api/recon/breach", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      console.log("OK");
      console.log(result);
      setBreachData(result.body.result);

      if (result.body.result === undefined || result.body.result.length == 0) {
        setResultMessage("Nothing Found...Contact Admin");
      } else {
        setResultMessage("");
      }
    }
  };

  return (
    <div>
      <div className="pl-6">
        <h1 className="text-3xl text-white">Data Directory Search</h1>
      </div>
      <label className="input input-bordered flex items-center gap-2 max-w-72 m-4">
        <input
          type="text"
          className="grow"
          placeholder="Search Data Breaches"
          value={keywordSearch}
          onChange={(event) => setKeywordSearch(event.target.value)}
        />
        <button onClick={handleBreachSearch}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </label>
      <div className="pl-6">{resultMessage && <p>{resultMessage}</p>}</div>

      <div className="max-w-full max-h-96 overflow-x-scroll overflow-y-scroll">
        {breachData &&
          breachData.map(
            (
              credential: {
                email: string;
                hash_password: boolean;
                password: string;
                sha1: string;
                hash: string;
                sources: string[];
              },
              index: number
            ) => (
              <div className="stats shadow" key={index}>
                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <MdAttachEmail color={iconColor} size={iconSize} />
                  </div>
                  <div className="stat-title">EMAIL</div>
                  <div className="stat-value">{credential.email || "None"}</div>
                  <div className="stat-desc">Email Found</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <PiPasswordBold color={iconColor} size={iconSize} />
                  </div>
                  <div className="stat-title">PASSWORD</div>
                  <div className="stat-value">
                    {credential.password || "None"}
                  </div>
                  <div className="stat-desc">Password Found</div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <FaLock color={iconColor} size={iconSize} />
                  </div>
                  <div className="stat-title">SHA1</div>
                  <div className="stat-value">{credential.sha1 || "None"}</div>
                  <div className="stat-desc">
                    hash function which takes an input and produces a 160-bit
                    (20-byte){" "}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-figure text-secondary">
                    <FaLock color={iconColor} size={iconSize} />
                  </div>
                  <div className="stat-title">HASH</div>
                  <div className="stat-value">{credential.hash || "None"}</div>
                  <div className="stat-desc">
                    Hashing is a one-way mathematical function that turns data
                    into a string of nondescript text that cannot be reversed or
                    decoded.
                  </div>
                </div>

                {/* {credential.sources &&
                credential.sources.map((source, index) => (
                  <div className="stat" key={index}>
                    <div className="stat-figure text-secondary">
                      <FaEye color={iconColor} size={iconSize} />
                    </div>
                    <div className="stat-title">{`SOURCE`}</div>
                    <div className="stat-value">{source}</div>
                  </div>
                ))} */}
              </div>
            )
          )}
      </div>
    </div>
  );
}
