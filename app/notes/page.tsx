"use client";

import React, { use, useEffect, useState } from "react";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import NoteForm from "@/components/Notes/NoteForm";
import NotesTable from "@/components/Notes/NotesTable";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaStickyNote } from "react-icons/fa";

type Props = {};

export default function Notes({}: Props) {
  const [userId, setUserId] = useState<string>("");
  const [userDocuments, setUserDocuments] = useState([]);
  const [showNotesForm, setShowNotesForm] = useState(false);

  const handleUserDocuments = async () => {
    const result = await getUserCookieSession();
    if (result) {
      const userInfo = result.userData;
      const id = userInfo.id;
      setUserId(id);
      const response = await fetch(`/api/document/render?id=${id}`);
      if (response.ok) {
        const documents = await response.json();
        console.log(documents);
        const documentNames = documents.data.map((document: any) => {
          return document.Key;
        });
        console.log(documentNames);
        setUserDocuments(documentNames);
      }
    }
  };

  useEffect(() => {
    handleUserDocuments();
  }, []);

  return (
    <div>
      <NavBarAuth />
      <div className="py-6 px-2  bg-black">
        <h1 className="text-6xl font-thin flex">
          Notes Center <FaStickyNote className="mx-2" />
        </h1>
      </div>
      <div className="flex">
        {showNotesForm && (
          <div className="basis-1/3">
            {userDocuments && (
              <NoteForm userDocuments={userDocuments} userId={userId} />
            )}
          </div>
        )}
        <div className={showNotesForm ? "basis-2/3" : "basis-full"}>
          <div className="flex bg-black p-2">
            <button
              className="btn btn-outline btn-primary"
              onClick={() => setShowNotesForm(!showNotesForm)}
            >
              Create Note
            </button>
          </div>
          <NotesTable />
        </div>
      </div>
    </div>
  );
}
