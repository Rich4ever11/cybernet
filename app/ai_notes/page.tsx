"use client";

import React, { Key, use, useEffect, useState } from "react";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import AINoteForm from "@/components/Notes/AINoteForm";
import AINotesTable from "@/components/Notes/AINoteTable";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaStickyNote } from "react-icons/fa";

// type Props = {};

export default function AINotes() {
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [userDocuments, setUserDocuments] = useState([]);
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [editNote, setEditNote] = useState<{
    note_content: string;
    note_id: string;
    chat_id: number;
  }>();

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
      <NavBarAuth setLoadingStatus={setLoading} />

      {loading ? (
        <>
          <div className="flex flex-row justify-center items-center h-screen">
            <div className="py-2">
              <h1 className="text-8xl font-thin">
                Loading{" "}
                <span className="loading loading-spinner loading-lg"></span>
              </h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="py-6 px-2 bg-black overflow-scroll w-screen">
            <h1 className="text-6xl font-thin flex divider divider-primary">
              AI Notes Center <FaStickyNote className="mx-2" size={175} />
            </h1>
          </div>
          <div className="flex flex-col">
            {showNotesForm && (
              <div className="basis-1/3">
                {userDocuments && editNote?.chat_id && (
                  <AINoteForm
                    key={editNote as unknown as Key}
                    editNote={
                      editNote as {
                        note_content: string;
                        note_id: string;
                        chat_id: number;
                      }
                    }
                    showForm={setShowNotesForm}
                  />
                )}
              </div>
            )}
            <div className={showNotesForm ? "basis-2/3" : "basis-full"}>
              {userId && (
                <AINotesTable
                  user_id={userId}
                  setNoteEdit={setEditNote}
                  showForm={setShowNotesForm}
                  isFormOpen={showNotesForm}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
