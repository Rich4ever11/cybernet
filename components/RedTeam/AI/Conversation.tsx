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

export default function Conversation({ userDocuments }: Props) {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [documentConversation, setDocumentConversation] = useState<any>([]);
  const [documentKey, setDocumentKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const parseDocument = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  async function handleDocumentRender(documentKey: string) {
    setLoading(true);
    setDynamicDocs([]);
    setDocumentConversation([]);
    setDocumentKey("");
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
    setDynamicDocs([
      {
        uri: objectURL,
      },
    ]);

    const user_id = documentKey.split("/")[0];
    const conversation_res = await fetch(
      `/api/chat?id=${user_id}&document_key=${documentKey}`
    );
    const responseConversationData = await conversation_res.json();
    setDocumentConversation(responseConversationData.body);
    setDocumentKey(documentKey);
    setLoading(false);
  }

  return (
    <div className="flex md:flex-row flex-col h-full">
      <div className="max-w-auto border-red-50 px-1 justify-items-center basis-4/12 flex flex-col justify-end bg-neutral-900">
        <Chat
          key={documentKey}
          document_key={documentKey}
          previousConversation={documentConversation}
        />
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
          <div className="drawer-side drawer-end z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <div>
              <h1 className="text-white font-3xl">Saved Documents</h1>
            </div>
            <ul className="menu bg-black text-base-content min-h-full w-80 p-4">
              {loading && (
                <li>
                  <p>Loading...</p>
                </li>
              )}
              {!loading &&
                userDocuments.map((userDocument, index) => (
                  <li key={index}>
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
