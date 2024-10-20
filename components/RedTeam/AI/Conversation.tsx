"use client";

import React, { useState } from "react";
import Chat from "./Chat";
import { PdfReader } from "pdfreader";
import { DocumentViewer } from "./Document.js";
import { IoIosDocument } from "react-icons/io";
import { UserDocumentDisplay } from "@/components/Documents/UserDocumentDisplay";
import pdfToText from "react-pdftotext";

interface DocumentMetaData {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: string;
  StorageClass: string;
}

type Props = {
  userDocuments: DocumentMetaData[];
};

export default function ({ userDocuments }: Props) {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [fileContents, setFileContents] = useState<string>("");

  const parseDocument = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  async function handleDocumentRender(documentKey: string) {
    setDynamicDocs([]);
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
    const contentType = responseData["contentType"];
    const documentBlob = new Blob([byteArrayConverted], {
      type: contentType,
    });
    const documentText = await documentBlob.text();
    const objectURL = URL.createObjectURL(documentBlob);
    const result = await pdfToText(documentBlob);
    setFileContents(result);
    setDynamicDocs([
      {
        uri: objectURL,
      },
    ]);
  }

  return (
    <div className="flex flex-row h-full">
      <div className="max-w-auto border-red-50 px-1 justify-items-center basis-4/12 flex flex-col justify-end bg-neutral-900">
        <Chat fileContents={fileContents} key={fileContents} />
      </div>
      <div className="basis-8/12">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <UserDocumentDisplay
              dynamicDocsProp={dynamicDocs}
              key={dynamicDocs}
            />
            <div className="flex p-2 bg-black">
              <label
                htmlFor="my-drawer"
                className="btn btn-black drawer-button btn-sm"
              >
                Render Saved Documents
              </label>
            </div>
          </div>
          <div className="drawer-side drawer-end">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div>
              <h1 className="text-white font-3xl">Saved Documents</h1>
            </div>
            <ul className="menu bg-black text-base-content min-h-full w-80 p-4">
              {userDocuments.map((userDocument) => (
                <li>
                  <a
                    className="text-white"
                    onClick={() => handleDocumentRender(userDocument.Key)}
                  >
                    <IoIosDocument color="white" size={24} />
                    {parseDocument(userDocument.Key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
