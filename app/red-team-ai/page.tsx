"use client";

import React, { useEffect, useState } from "react";
import Conversation from "@/components/RedTeam/AI/Conversation";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import { getUserCookieSession } from "@/util/middleware/cookies";

// type Props = {};

export default function AI() {
  const [userDocuments, setUserDocuments] = useState([]);

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
      <NavBarAuth />
      <Conversation userDocuments={userDocuments} />
    </div>
  );
}
