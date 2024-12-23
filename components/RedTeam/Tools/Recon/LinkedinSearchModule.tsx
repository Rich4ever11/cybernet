"use client";

import React, { useState } from "react";
import LinkedinCard from "./Card/LinkedinCard";

// type Props = {};

export default function LinkedinSearchModule() {
  const [searchByValue, setSearchByValue] = useState("keywords");
  const [searchQuery, setSearchQuery] = useState("");
  const [linkedinData, setLinkedinData] = useState([]);

  const searchByOptions = [
    "keywords",
    "geo",
    "schoolId",
    "firstName",
    "lastName",
    "keywordSchool",
    "keywordTitle",
    "company",
  ];

  const handleLinkedinSearch = async () => {
    const data = {
      queryParam: searchByValue,
      searchValue: searchQuery,
    };

    const res = await fetch("/api/recon/linkedin", {
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
      console.log(result.body.data.items);
      setLinkedinData(result.body.data.items);
    }
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="basis-2/4 max-md:basis-full">
          <div className="">
            <h1 className="text-3xl text-white">Linkedin Search</h1>
          </div>
          <div className="max-w-lg  py-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="Search Linkedin Profiles"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button onClick={handleLinkedinSearch}>
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

            <select
              className="select select-error w-full max-w-xs my-2"
              onChange={(event) => setSearchByValue(event.target.value)}
            >
              <option disabled selected>
                Select a parameter to search by
              </option>
              {searchByOptions.map((param, index) => (
                <option value={param} key={index}>
                  {param}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="basis-2/4 max-md:hidden">
          <div className="flex justify-center divider divider-error">
            <h1 className="text-4xl text-white">Reconnaissance</h1>
          </div>
          <article className="text-wrap">
            <div className="text-white space-y-4 flex justify-center">
              <div>
                <p className="text-center ">
                  The first penetration testing phase is reconnaissance. In this
                  phase, the tester gathers as much information about the target
                  system as they can, including information about the network
                  topology, operating systems and applications, user accounts,
                  and other relevant information. The goal is to gather as much
                  data as possible so that the tester can plan an effective
                  attack strategy.
                </p>
              </div>
            </div>
            <p className="text-end text-gray-600">— eccouncil.org</p>
          </article>
        </div>
      </div>

      <div className="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4">
        {linkedinData &&
          linkedinData.map(
            (
              linkedin: {
                fullName: string;
                headline: string;
                summary: string;
                profilePicture: string;
                location: string;
                profileURL: string;
                username: string;
              },
              index: number
            ) => (
              <div className="carousel-item" key={index}>
                <LinkedinCard
                  fullName={linkedin.fullName}
                  headline={linkedin.headline}
                  summary={linkedin.summary}
                  profilePicture={linkedin.profilePicture}
                  location={linkedin.location}
                  profileURL={linkedin.profileURL}
                  username={linkedin.username}
                />
              </div>
            )
          )}
      </div>
    </div>
  );
}
