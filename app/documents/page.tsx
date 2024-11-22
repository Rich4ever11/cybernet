"use client";

import UserDocumentsTable from "@/components/Documents/UserDocumentsTable";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import { getUserCookieSession } from "@/util/middleware/cookies";
import React, { useEffect, useState } from "react";
import { IoDocumentLockSharp } from "react-icons/io5";

// type Props = {};

export default function Documents() {
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
        <div className="py-6 px-2  bg-black">
          <h1 className="md:text-6xl text-3xl font-thin flex divider divider-primary">
            Document Center <IoDocumentLockSharp className="mx-2" size={200} />
          </h1>
        </div>
        <UserDocumentsTable
          userDocuments={userDocuments}
          updateUserDocuments={handleUserDocuments}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
    </div>
  );
}
