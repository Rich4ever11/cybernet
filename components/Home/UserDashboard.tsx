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
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [renderedDocument, setRenderedDocument] = useState<string>("");

  const handleUserDocuments = async () => {
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
  };

  const parseDocument = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleDocumentRender = async (documentKey: string) => {
    const documentName = parseDocument(documentKey);
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
  }, []);

  return (
    <div className="h-screen">
      <div className="flex justify-center divider divider-primary p-10">
        <h1 className="md:text-6xl text-3xl py-8 text-slate-400 font-thin">
          {" "}
          Documents
        </h1>
      </div>

      <div>
        <div className="overflow-x-auto overflow-y-scroll max-w-full max-h-screen">
          <table className="table">
            <thead>
              <tr>
                <th className="hidden md:block">Name</th>
                <th>Document Name</th>
                <th>Size</th>
                <th></th>
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
                    <td className="hidden md:block">
                      <div className="hidden visible md:flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src="https://plus.unsplash.com/premium_photo-1677402408071-232d1c3c3787?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              alt="Avatar Tailwind CSS Component"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {firstName} {lastName}
                          </div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {parseDocument(document.Key)}
                      <br />
                      <span className="badge badge-ghost badge-sm">
                        {document.LastModified}
                      </span>
                    </td>
                    <td>{document.Size}</td>
                    <th>
                      <button
                        className="btn btn-ghost btn-xs"
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
                <th className="hidden md:block">Name</th>
                <th>Document Name</th>
                <th>Size</th>
                <th></th>
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
        <div className="flex justify-center ">
          <div className="flex overflow-x-scroll max-w-screen-2xl">
            {/* <UserNoteCard
              noteId={1}
              document="document.txt"
              userQuestion="How is the weather?"
              cybernetResponse="Looks Good in Maryland :D"
              username={firstName + " " + lastName}
            /> */}
          </div>
        </div>

        <div className="p-2 flex flex-row-reverse">
          <button className="btn btn-outline btn-primary pl-4">
            View Notes Dashboard
          </button>
        </div>
      </div>

      <div>
        <div className="">
          {dynamicDocs.length ? (
            <div className="overflow-x-scroll w-auto">
              <div className="flex justify-center divider divider-primary">
                <h1 className="text-white font-thin text-4xl py-2">
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
