"use client";

import React, { Key, use, useEffect, useState } from "react";
import NavBarAuth from "@/components/Navbar/NavBarAuth";
import NoteForm from "@/components/Notes/NoteForm";
import NotesTable from "@/components/Notes/NotesTable";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { IoDocumentLockSharp } from "react-icons/io5";
import { FaStickyNote } from "react-icons/fa";

// type Props = {};

export default function Notes() {
  const [userId, setUserId] = useState<string>("");
  const [userDocuments, setUserDocuments] = useState([]);
  const [showNotesForm, setShowNotesForm] = useState(false);
  const [editNote, setEditNote] = useState({});
  const [loading, setLoading] = useState<boolean>(true);

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

  const handleCreateNoteForm = () => {
    setEditNote({});
    setShowNotesForm(true);
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
              Notes Center <FaStickyNote className="mx-2" size={175} />
            </h1>
          </div>
          <div className="flex flex-col">
            {showNotesForm && (
              <div className="basis-1/3">
                {userDocuments && userId && (
                  <NoteForm
                    key={editNote as Key}
                    userDocuments={userDocuments}
                    userId={userId}
                    editNote={
                      editNote as {
                        note_content: string;
                        document_key: string;
                        note_id: string;
                      }
                    }
                    showForm={setShowNotesForm}
                  />
                )}
              </div>
            )}
            <div className={showNotesForm ? "basis-2/3" : "basis-full"}>
              <div className="flex bg-black p-2">
                <button
                  className="btn btn-outline btn-primary"
                  disabled={showNotesForm}
                  onClick={handleCreateNoteForm}
                >
                  Create Note
                </button>
              </div>
              {userId && (
                <NotesTable
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
