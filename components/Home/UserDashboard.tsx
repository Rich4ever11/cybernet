"use client";

import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useUser } from "@/context/User/UserContext";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import UserNoteCard from "./Card/UserNoteCard";
import Link from "next/link";

// type Props = {};

export default function UserDocuments() {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [userDocuments, setUserDocuments] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [renderedDocument, setRenderedDocument] = useState<string>("");

  const handleUserDocuments = async () => {
    try {
      const result = await getUserCookieSession();
      if (result) {
        const userInfo = result.userData;
        const id = userInfo.id;
        setFirstName(userInfo.first_name);
        setLastName(userInfo.last_name);
        const response = await fetch(`/api/document/render?id=${id}`);
        if (response.ok) {
          const documents = await response.json();
          console.log(documents);
          setUserDocuments(documents.data);
        }
        console.log(id);
      }
    } catch {
      console.log("Failed to get documents");
    }
  };

  const handleUserNotes = async () => {
    try {
      const result = await getUserCookieSession();
      const userInfo = result.userData;
      const user_id = userInfo.id;

      const response = await fetch(`/api/notes?id=${user_id}`);
      const notes_result = await response.json();
      setUserNotes(notes_result.body);
    } catch {
      console.log("Failed to get notes");
    }
  };

  const handleUserChat = async () => {
    try {
      const result = await getUserCookieSession();
      const userInfo = result.userData;
      const user_id = userInfo.id;

      const response = await fetch(`/api/notes/ai?id=${user_id}`);
      const chat_results = await response.json();
      console.log(chat_results);
      setUserChats(chat_results.body);
    } catch {
      console.log("Failed to get notes");
    }
  };

  const parseDocumentKey = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleDocumentRender = async (documentKey: string) => {
    const documentName = parseDocumentKey(documentKey);
    const data = {
      documentKey: documentKey,
    };

    const res = await fetch("/api/document/render", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    const byteArrayConverted = new Int8Array(
      Object.values(responseData["data"])
    );
    const contentType = responseData.metadata.contentType;
    const documentBlob = new Blob([byteArrayConverted], {
      type: contentType,
    });

    const objectURL = URL.createObjectURL(documentBlob);
    setRenderedDocument(documentName);
    setDynamicDocs([
      {
        uri: objectURL,
      },
    ]);
  };

  useEffect(() => {
    handleUserDocuments();
    handleUserNotes();
    handleUserChat();
  }, []);

  return (
    <div className="min-h-screen h-full">
      <div className="flex justify-center divider divider-primary p-10">
        <h1 className="md:text-6xl text-3xl py-8 text-slate-400 font-thin">
          {" "}
          Documents
        </h1>
      </div>

      <div className="w-screen">
        <div className="overflow-x-auto overflow-y-scroll max-w-full max-h-screen shrink-0">
          <table className="table">
            <thead>
              <tr>
                <th className="text-white">Name</th>
                <th className="text-white">Document Name</th>
                <th className="text-white">Size</th>
                <th className="text-white"></th>
              </tr>
            </thead>
            <tbody>
              {userDocuments.map(
                (
                  document: {
                    Key: string;
                    LastModified: string;
                    ETag: string;
                    Size: string;
                    StorageClass: string;
                  },
                  index
                ) => (
                  <tr key={index}>
                    <td className="">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-white">
                            {firstName} {lastName}
                          </div>
                          <div className="text-sm opacity-50 text-white">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-white">
                      {parseDocumentKey(document.Key)}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {document.LastModified}
                      </span>
                    </td>
                    <td className="text-white">{document.Size}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs text-white "
                        onClick={() => handleDocumentRender(document.Key)}
                      >
                        Render Document
                      </button>
                    </th>
                  </tr>
                )
              )}
            </tbody>

            <tfoot>
              <tr>
                <th className="text-white">Name</th>
                <th className="text-white">Document Name</th>
                <th className="text-white">Size</th>
                <th className="text-white"></th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-2 flex flex-row-reverse">
          <button className="btn btn-outline btn-primary pl-4">
            <Link
              href="/documents"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              View Document Dashboard
            </Link>
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-center divider divider-primary p-10">
          <h1 className="md:text-6xl text-3xl py-8 text-slate-400 font-thin">
            {" "}
            Notes
          </h1>
        </div>
        <div className="flex justify-center w-screen">
          <div className="flex overflow-x-scroll space-x-4">
            {userNotes.map(
              (
                userNote: {
                  id: string;
                  timestamp: string;
                  content: string;
                  document_key: string;
                },
                index
              ) => (
                <div
                  className="card bg-base-100/20 w-96 h-64 shrink-0 shadow-xl border-2 border-white/50 overflow-scroll"
                  key={index}
                >
                  <div className="card-body">
                    <h2 className="card-title w-fit overflow-x-scroll text-white text-2xl font-thin">
                      {parseDocumentKey(userNote.document_key)}
                    </h2>
                    <p className="text-white">{userNote.content}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="p-2 flex flex-row-reverse">
          <button className="btn btn-outline btn-primary pl-4">
            <Link
              href="/notes"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              View Notes Dashboard
            </Link>
          </button>
        </div>

        <div>
          <div className="flex justify-center divider divider-primary p-10">
            <h1 className="md:text-6xl text-3xl py-8 text-slate-400 font-thin">
              {" "}
              Chat
            </h1>
          </div>
          <div className="flex justify-center w-screen">
            <div className="flex overflow-x-scroll space-x-4">
              {userChats.map(
                (
                  chat: {
                    id: number;
                    user_id: string;
                    document_id: string;
                    user_question: string;
                    model_response: string;
                    model_version: string;
                    created_at: string;
                  },
                  index
                ) => (
                  <div key={index}>
                    <UserNoteCard
                      noteId={chat.id}
                      document={parseDocumentKey(chat.document_id)}
                      userQuestion={chat.user_question}
                      cybernetResponse={chat.model_response}
                      created_at={chat.created_at}
                      username={firstName + " " + lastName}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-row-reverse">
          <button className="btn btn-outline btn-primary pl-4">
            <Link
              href="/red-team-ai"
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              Chat With Cybernet AI
            </Link>
          </button>
        </div>
      </div>

      <div>
        <div className="">
          {dynamicDocs.length ? (
            <div className="overflow-x-scroll w-screen">
              <div className="flex justify-center divider divider-primary">
                <h1 className="text-white font-thin text-4xl py-2 overflow-x-scroll">
                  {renderedDocument}
                </h1>
              </div>
              <div
                style={{ height: "100vh", overflow: "hidden" }}
                className="bg-black w-screen overflow-scroll"
              >
                <DocViewer
                  className="w-fit"
                  pluginRenderers={DocViewerRenderers}
                  documents={dynamicDocs}
                  style={{
                    maxHeight: "100vh",
                    maxWidth: "100%",
                    overflow: "scroll",
                  }}
                />
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
