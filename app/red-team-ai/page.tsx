"use client";

import React, { useEffect, useState } from "react";
import Conversation from "@/components/RedTeam/AI/Conversation";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import { getUserCookieSession } from "@/util/middleware/cookies";

// type Props = {};

export default function AI() {
  const [userDocuments, setUserDocuments] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleUserDocuments = async () => {
    const result = await getUserCookieSession();
    if (result) {
      const userInfo = result.userData;
      const id = userInfo.id;
      const response = await fetch(`/api/document/render?id=${id}`);
      if (response.ok) {
        const documents = await response.json();
        console.log(documents);
        setUserDocuments(documents.data);
      }
    }
  };

  useEffect(() => {
    handleUserDocuments();
  }, []);

  return (
    <div>
      <NavBarAuth setLoadingStatus={setLoading} />

      {loading ? (
        <>
          <div className="flex justify-center h-screen">
            <div className="py-2">
              <h1 className="text-8xl font-thin">
                Loading{" "}
                <span className="loading loading-spinner loading-lg"></span>
              </h1>
            </div>
          </div>
        </>
      ) : (
        <Conversation userDocuments={userDocuments} />
      )}
    </div>
  );
}
