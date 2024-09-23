import React from "react";

type Props = {};

export default function NmapScanningModule({}: Props) {
  const example_scan = {
    body: {
      nmap: {
        command_line: "nmap -oX - -p 1-200 -A -v 127.0.0.1",
        scaninfo: {
          tcp: {
            method: "syn",
            services: "1-200",
          },
        },
        scanstats: {
          downhosts: "0",
          elapsed: "24.52",
          timestr: "Sun Sep 22 21:31:01 2024",
          totalhosts: "1",
          uphosts: "1",
        },
      },
      scan: {
        "127.0.0.1": {
          addresses: {
            ipv4: "127.0.0.1",
          },
          hostnames: [
            {
              name: "localhost",
              type: "PTR",
            },
          ],
          osmatch: [
            {
              accuracy: "100",
              line: "69748",
              name: "Microsoft Windows 10 1607",
              osclass: [
                {
                  accuracy: "100",
                  cpe: ["cpe:/o:microsoft:windows_10:1607"],
                  osfamily: "Windows",
                  osgen: "10",
                  type: "general purpose",
                  vendor: "Microsoft",
                },
              ],
            },
          ],
          portused: [
            {
              portid: "135",
              proto: "tcp",
              state: "open",
            },
            {
              portid: "1",
              proto: "tcp",
              state: "closed",
            },
            {
              portid: "36480",
              proto: "udp",
              state: "closed",
            },
          ],
          status: {
            reason: "localhost-response",
            state: "up",
          },
          tcp: {
            "135": {
              conf: "10",
              cpe: "cpe:/o:microsoft:windows",
              extrainfo: "",
              name: "msrpc",
              product: "Microsoft Windows RPC",
              reason: "syn-ack",
              state: "open",
              version: "",
            },
            "137": {
              conf: "3",
              cpe: "",
              extrainfo: "",
              name: "netbios-ns",
              product: "",
              reason: "no-response",
              state: "filtered",
              version: "",
            },
          },
          uptime: {
            lastboot: "Fri Sep 20 21:42:41 2024",
            seconds: "172100",
          },
          vendor: {},
        },
      },
    },
  };

  return <div>NmapScanningModule</div>;
}
