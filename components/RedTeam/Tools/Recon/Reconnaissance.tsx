import React from "react";
import LinkedinSearchModule from "./LinkedinSearchModule";
import BreachSearch from "./BreachSearchModule";
import { GiCyberEye } from "react-icons/gi";

type Props = {};

export default function Reconnaissance({}: Props) {
  return (
    <div className="m-4">
      <div className="flex justify-items-center align-middle p-8">
        <div className="mr-2">
          <GiCyberEye color={"#ffe3e1"} size={64} />{" "}
        </div>
        <h1 className="text-6xl text-white">Reconnaissance</h1>
      </div>
      <LinkedinSearchModule />
      <BreachSearch />
    </div>
  );
}
