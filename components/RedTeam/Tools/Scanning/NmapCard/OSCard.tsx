import React from "react";

type Props = {
  name: string;
  accuracy: string;
  osInfo: any;
};

export default function OSCard({ name, accuracy, osInfo }: Props) {
  return (
    <div className="flex justify-center">
      <div className="stats shadow bg-black my-2">
        <div className="stat place-items-center">
          <div className="stat-title">OS Name</div>
          <div className="stat-value">{name}</div>
          <div className="stat-desc">
            Name of the OS running on the scanned machine
          </div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Accuracy</div>
          <div className="stat-value text-error">{accuracy + "%"}</div>
          <div className="stat-desc text-error">
            Percentage that the OS matches
          </div>
        </div>

        {osInfo.map((os: any) =>
          os.cpe.map((cpe: string) => (
            <div className="stat place-items-center">
              <div className="stat-title">CPE</div>
              <div className="stat-value text-error">{cpe}</div>
              <div className="stat-desc text-error">
                Vulnerable CPE Apart of the OS
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
