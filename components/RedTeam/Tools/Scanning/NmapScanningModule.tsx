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
        setScanResults(result);

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
        <button className="btn btn-outline btn-error" onClick={handlePortScan}>
          Scan Target
        </button>
      </div>

      {loading == false ? (
        <div className="p-2">
          {scanResults?.body?.scan &&
            Object.keys(scanResults?.body?.scan).map(
              (machineKey: string, index: number) => (
                <div key={index}>
                  {handleOSInfo(scanResults.body.scan[machineKey] as any)}
                  {handlePortDisplay(scanResults.body.scan[machineKey] as any)}
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
