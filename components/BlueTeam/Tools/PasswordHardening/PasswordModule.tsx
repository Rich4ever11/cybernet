import React from "react";
import PasswordGenerator from "./PasswordGenerator";
import { GiCyberEye } from "react-icons/gi";

type Props = {};

export default function PasswordModule({}: Props) {
  return (
    <div>
      <div className="m-4">
        <div className="flex justify-items-center align-middle p-8">
          <div className="mr-2">
            <GiCyberEye color={"#a9ebf4"} size={64} />{" "}
          </div>
          <h1 className="text-6xl text-white">Password Hardening</h1>
        </div>
        <PasswordGenerator />
      </div>
    </div>
  );
}
