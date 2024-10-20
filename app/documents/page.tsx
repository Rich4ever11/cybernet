"use client";

import UserDocumentsTable from "@/components/Documents/UserDocumentsTable";
import UserDocuments from "@/components/Home/UserDashboard";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import { getUserCookieSession } from "@/util/middleware/cookies";
import React, { useEffect, useState } from "react";

type Props = {};

export default function route({}: Props) {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userDocuments, setUserDocuments] = useState([]);

  const handleUserDocuments = async () => {
    const result = await getUserCookieSession();
    if (result) {
      const userInfo = result.userData;
      const id = userInfo.id;
      setFirstName(userInfo.first_name);
      setLastName(userInfo.last_name);
      console.log(id);
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
      <div className="">
        <UserDocumentsTable
          userDocuments={userDocuments}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
    </div>
  );
}
