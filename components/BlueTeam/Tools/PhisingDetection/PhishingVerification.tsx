import React, { useState } from "react";

type Props = {};

export default function PhishingVerification({}: Props) {
  const [loading, setLoading] = useState(false);
  const [phishingLink, setPhishingLink] = useState<string>();
  const [phishingLinkData, setPhishingLinkData] = useState();

  const handlePhishingFinder = async () => {
    setLoading(true);

    try {
      const data = {
        phishingLink: phishingLink,
      };

      const res = await fetch("/api/phishing/search", {
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
        setPhishingLinkData(result.body);
      }
    } catch {
      console.log("Search Failed");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="p-4">
        <div className="py-2">
          <h1 className="text-4xl text-white">Check Phishing Link</h1>
        </div>
        <div className="max-w-lg  py-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Phishing Link"
              value={phishingLink}
              onChange={(event) => setPhishingLink(event.target.value)}
            />
          </label>

          <div className="py-2">
            <button
              className="btn btn-outline btn-info"
              onClick={handlePhishingFinder}
            >
              Check Link
            </button>
          </div>
        </div>
      </div>

      {phishingLinkData && (
        <div className="p-2">
          <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-blue-200">
                Phishing Site: {phishingLinkData.verified as string}
              </h1>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-lg text-white">
                Phishing Target: {phishingLinkData.target as string}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
