"use client";

import React, { useState } from "react";
import { passwordTips } from "./passwordTips.js";
import { FaClipboard } from "react-icons/fa";

type Props = {};

const specialCharactersList = [
  "~",
  ":",
  "'",
  "+",
  "[",
  "\\",
  "@",
  "^",
  "{",
  "%",
  "(",
  "-",
  '"',
  "*",
  "|",
  ",",
  "&",
  "<",
  "`",
  "}",
  ".",
  "_",
  "=",
  "]",
  "!",
  ">",
  ";",
  "?",
  "#",
  "$",
  ")",
  "/",
];

export default function PasswordGenerator({}: Props) {
  const [lowerCaseLetters, setLowerCaseLetters] = useState<boolean>(true);
  const [upperCaseLetters, setUpperCaseLetters] = useState<boolean>(true);
  const [numbers, setNumbers] = useState<boolean>(true);
  const [specialCharacters, setSpecialCharacters] = useState<boolean>(true);
  const [passwordLength, setPasswordLenght] = useState<number>(20);

  const [generatedPassword, setGeneratedPassword] = useState<string>("");

  const getRandomASCIINumber = (minASCII: number, maxASCII: number) => {
    return Math.floor(Math.random() * (maxASCII - minASCII + 1)) + minASCII;
  };

  const handlePasswordGeneration = () => {
    setGeneratedPassword("");
    // Create a list of values we need
    const filteredPassConfig = [
      { name: "lowerLetters", checked: lowerCaseLetters, ASCIISpan: [97, 122] },
      { name: "upperLetters", checked: upperCaseLetters, ASCIISpan: [65, 90] },
      { name: "numbers", checked: numbers, ASCIISpan: [48, 57] },
      {
        name: "specialCharacters",
        checked: specialCharacters,
      },
    ].filter((passConfig) => passConfig.checked === true);
    if (filteredPassConfig.length > 0) {
      let newPassword = "";
      console.log(filteredPassConfig);
      for (let i = 0; i < passwordLength; i++) {
        const selectedConfigIndex = Math.floor(
          Math.random() * filteredPassConfig.length
        );
        if (
          filteredPassConfig[selectedConfigIndex].name === "specialCharacters"
        ) {
          const newChar =
            specialCharactersList[
              Math.floor(Math.random() * specialCharactersList.length)
            ];
          newPassword += newChar;
        } else {
          const [min, max] =
            filteredPassConfig[selectedConfigIndex].ASCIISpan || [];
          const newChar = String.fromCharCode(getRandomASCIINumber(min, max));
          newPassword += newChar;
        }
      }
      setGeneratedPassword(newPassword);
    }
  };

  return (
    <div className="flex flex-nowrap">
      <div className="basis-2/4 max-md:basis-full p-2 max-w-full">
        <div className="">
          <h1 className="text-4xl text-white">Password Generator</h1>
        </div>
        <div className="max-w-3xl py-2">
          <div className="flex space-x-2 max-w-4xl">
            <input
              type="text"
              className="input input-bordered input-info w-full"
              disabled={true}
              value={generatedPassword}
            />

            <button
              className="btn btn-outline btn-info"
              onClick={handlePasswordGeneration}
            >
              Generate Password
            </button>
          </div>

          <div className="py-8">
            <p className="py-2 text-2xl text-white">
              Password Length {passwordLength}
            </p>
            <input
              type="range"
              min={0}
              max="1000"
              value={passwordLength}
              onChange={(event) =>
                setPasswordLenght(event.target.valueAsNumber)
              }
              className="range range-info"
            />
          </div>

          <div className="form-control w-full max-w-full py-2">
            <label className="cursor-pointer label">
              <span className="label-text text-2xl text-white">
                Lowercase Letters
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={lowerCaseLetters}
                onChange={(event) => setLowerCaseLetters(event.target.checked)}
              />
            </label>
          </div>

          <div className="form-control w-full max-w-full py-2">
            <label className="cursor-pointer label">
              <span className="label-text text-2xl text-white">
                Uppercase Letters
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={upperCaseLetters}
                onChange={(event) => setUpperCaseLetters(event.target.checked)}
              />
            </label>
          </div>

          <div className="form-control w-full max-w-full py-2">
            <label className="cursor-pointer label">
              <span className="label-text text-2xl text-white">Numbers</span>
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={numbers}
                onChange={(event) => setNumbers(event.target.checked)}
              />
            </label>
          </div>

          <div className="form-control w-full max-w-full py-2">
            <label className="cursor-pointer label">
              <span className="label-text text-2xl text-white">
                Special Characters
              </span>
              <input
                type="checkbox"
                className="checkbox checkbox-info"
                checked={specialCharacters}
                onChange={(event) => setSpecialCharacters(event.target.checked)}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="basis-2/4 max-md:hidden">
        <article className="text-wrap">
          <div className="flex justify-center">
            <h1 className="text-4xl text-white">
              Tips to Secure your password
            </h1>
          </div>

          <div className="divider divider-info text-white">
            Password Tips (Credit - passwordsgenerator.net){" "}
          </div>
          <div className="overflow-y-auto h-96 text-white">
            {passwordTips.map((tip, index) => (
              <div key={index} className="py-2">
                <p className="text-lg">{tip}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
