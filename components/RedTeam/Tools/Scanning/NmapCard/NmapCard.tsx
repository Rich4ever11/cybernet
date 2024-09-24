import React from "react";
import { PiTargetBold } from "react-icons/pi";

type Props = {
  port: string;
  conf: string;
  cpe: string;
  extrainfo: string;
  name: string;
  product: string;
  reason: string;
  state: string;
  version: string;
};

export default function ({
  port,
  conf,
  cpe,
  extrainfo,
  name,
  product,
  reason,
  state,
  version,
}: Props) {
  return (
    <div>
      <div className="card bg-black text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-4xl text-error">
            <PiTargetBold />
            {port}
          </h2>
          <p className="text-xl">
            Port Name: <span className="text-white">{name || "None"}</span>
          </p>
          <p className="text-xl">
            Port Product:{" "}
            <span className="text-white">{product || "None"}</span>
          </p>
          <p className="text-xl">
            Port CPE: <span className="text-white">{cpe || "None"}</span>
          </p>

          <p>
            Port State: <span className="text-white">{state || "None"}</span>
          </p>
          <p>
            Port Version:{" "}
            <span className="text-white">{version || "None"}</span>
          </p>
          <p>
            Port Conf: <span className="text-white">{conf || "None"}</span>
          </p>
          <p>
            Port Reason: <span className="text-white">{reason || "None"}</span>
          </p>
          <p>
            Port Extra Info:{" "}
            <span className="text-white">{extrainfo || "None"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
