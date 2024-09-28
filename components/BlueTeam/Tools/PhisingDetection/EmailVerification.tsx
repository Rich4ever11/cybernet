import React, { useState } from "react";

type Props = {};

export default function EmailVerification({}: Props) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>();
  const [emailVerificationData, setEmailVerificationData] = useState<any>();
  const [resultMessage, setResultMessage] = useState("");

  const handleEmailVerifier = async () => {
    setLoading(true);

    try {
      const data = {
        email: email,
      };

      const res = await fetch("/api/phishing/email", {
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
        if (result?.body?.status !== "fail") {
          setEmailVerificationData(result.body);
        }
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
          <h1 className="text-4xl text-white">Verify Email</h1>
        </div>
        <div className="max-w-lg  py-2">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Email Verifier"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <div className="py-2">
            <button
              className="btn btn-outline btn-info"
              onClick={handleEmailVerifier}
            >
              Verify Email
            </button>
          </div>
        </div>
      </div>

      {emailVerificationData && (
        <div className="p-2">
          <div className="max-w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-center">
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-blue-200">
                Reputation:{" "}
                {emailVerificationData?.reputation.toUpperCase() as string}
              </h1>
            </div>
            <div className="flex justify-center">
              <p className="mb-3 font-normal text-lg text-white">
                {emailVerificationData?.summary}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
