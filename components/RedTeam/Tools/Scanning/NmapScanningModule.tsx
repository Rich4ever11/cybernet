"use client";

import React, { useState } from "react";
import NmapCard from "./NmapCard/NmapCard";
import OSCard from "./NmapCard/OSCard";

type Props = {};

export default function NmapScanningModule({}: Props) {
  const [ipAddress, setIpAddress] = useState("");
  const [portSpan, setPortSpan] = useState(1);
  const [scanResults, setScanResults] = useState();
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handlePortDisplay = (machine: any) => {
    const ports = machine?.tcp;
    return (
      <>
        {ports ? (
          <div className="carousel carousel-center bg-neutral rounded-box max-w-full space-x-4 p-4">
            {Object.keys(ports).map((port: any, index: number) => (
              <div key={index}>
                <NmapCard
                  port={port}
                  conf={ports[port].conf || ""}
                  cpe={ports[port].cpe || ""}
                  extrainfo={ports[port].extrainfo || ""}
                  name={ports[port].name || ""}
                  product={ports[port].product || ""}
                  reason={ports[port].reason || ""}
                  state={ports[port].state || ""}
                  version={ports[port].version || ""}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleOSInfo = (machine: any) => {
    const os = machine?.osmatch;
    return (
      <>
        {os ? (
          <div className="">
            {os.map((osObj: any, index: number) => (
              <div key={index}>
                <OSCard
                  name={osObj.name}
                  accuracy={osObj.accuracy || ""}
                  osInfo={osObj.osclass}
                />
              </div>
            ))}
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handlePortScan = async () => {
    setLoading(true);

    try {
      const data = {
        host: ipAddress,
        ports: `1-${portSpan}`,
      };

      const res = await fetch("/api/scan/nmap", {
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
        setScanResults(result.body.scan);

        if (
          result.body.result === undefined ||
          result.body.result.length == 0
        ) {
          setResultMessage("Nothing Found...Contact Admin");
        } else {
          setResultMessage("");
        }
      }
    } catch {
      console.log("Scan Failed");
    }

    setLoading(false);
  };

  return (
    <div className="p-4">
      <div className="flex">
        <div className="basis-2/4 max-md:basis-full">
          <div className="">
            <h1 className="text-4xl text-white">Nmap Scanner</h1>
          </div>
          <div className="max-w-lg  py-2">
            <label className="input input-bordered flex items-center gap-2">
              <input
                type="text"
                className="grow"
                placeholder="IP Address or Domain"
                value={ipAddress}
                onChange={(event) => setIpAddress(event.target.value)}
              />
            </label>
          </div>
          <div className="max-w-lg  py-2">
            <div className="py-2">
              <h1 className="text-xl text-white">Ports: {`1-${portSpan}`}</h1>
            </div>
            <input
              type="range"
              min={1}
              max={65535}
              value={portSpan}
              onChange={(event) => setPortSpan(parseInt(event.target.value))}
              className="range range-error"
            />
          </div>
          <div>
            <button
              className="btn btn-outline btn-error"
              onClick={handlePortScan}
            >
              Scan Target
            </button>
          </div>
        </div>

        <div className="basis-2/4 max-md:hidden">
          <div className="flex justify-center divider divider-error">
            <h1 className="text-4xl text-white">Port Scanning</h1>
          </div>
          <article className="text-wrap">
            <div className="text-white space-y-4">
              <div>
                <p className="text-center">
                  Once all the relevant data has been gathered in the
                  reconnaissance phase, it’s time to move on to scanning. In
                  this penetration testing phase, the tester uses various tools
                  to identify open ports and check network traffic on the target
                  system. Because open ports are potential entry points for
                  attackers, penetration testers need to identify as many open
                  ports as possible for the next penetration testing phase.
                </p>
              </div>
              <p className="text-end text-gray-600">— eccouncil.org</p>
            </div>
          </article>
        </div>
      </div>

      {loading == false ? (
        <div className="p-2">
          {scanResults &&
            Object.keys(scanResults).map(
              (machineKey: string, index: number) => (
                <div key={index}>
                  {handleOSInfo(scanResults[machineKey] as any)}
                  {handlePortDisplay(scanResults[machineKey] as any)}
                </div>
              )
            )}
        </div>
      ) : (
        <div className="p-4">Loading...</div>
      )}
    </div>
  );
}
