"use client";

import React from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useUser } from "@/context/User/UserContext";
import { getUserCookieSession } from "@/util/middleware/cookies";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { IoIosDocument } from "react-icons/io";

type Props = {};

export default function UserDocuments({}: Props) {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [userDocuments, setUserDocuments] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();

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
    console.log(documentKey);
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
    // const documentByteArray = await res.arrayBuffer();
    // const documentBlob = new Blob([documentByteArray], {
    //   type: "application/pdf",
    // });

    const responseData = await res.json();
    const byteArrayConverted = new Int8Array(
      Object.values(responseData["data"])
    );
    const documentBlob = new Blob([byteArrayConverted], {
      type: responseData["contentType"],
    });
    const objectURL = URL.createObjectURL(documentBlob);
    console.log(objectURL);
    setDynamicDocs([
      ...dynamicDocs,
      {
        uri: objectURL,
      },
    ]);
  };

  useEffect(() => {
    handleUserDocuments();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-4xl p-4 text-white">
          {" "}
          {firstName} {lastName} Documents
        </h1>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
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
                    <th>
                      <label>
                        <input type="checkbox" className="checkbox" />
                      </label>
                    </th>
                    <td>
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

            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Document Name</th>
                <th>Size</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-2 flex flex-row-reverse">
          <button className="btn btn-outline btn-primary pl-4">
            Send to Cybernet AI
          </button>
        </div>
      </div>

      <div>
        <div
          style={{ height: "100vh", overflow: "hidden" }}
          className="px-4 bg-black"
        >
          {dynamicDocs.length ? (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={dynamicDocs}
              style={{
                maxHeight: "100vh",
                maxWidth: "100%",
                overflow: "scroll",
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
