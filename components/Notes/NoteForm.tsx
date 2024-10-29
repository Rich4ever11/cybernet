"use client";
import React, { useState } from "react";

type Props = {
  userDocuments: string[];
  userId: string;
};
export default function NoteForm({ userDocuments, userId }: Props) {
  const [documentKey, setDocumentKey] = useState<string>("");
  const [noteContents, setNoteContents] = useState<string>("");
  const parseDocumentName = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleNoteCreation = async () => {
    const currTimeSeconds = Math.floor(Date.now() / 1000);
    const data = {
      documentKey: documentKey,
      note_contents: noteContents,
      timestamp: currTimeSeconds,
      user_id: userId,
    };
    const res = await fetch("/api/notes", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    if (responseData.ok) {
      console.log("Successfully added note");
      setNoteContents("");
    }
  };

  return (
    <div className="">
      <div className="bg-black w-auto p-10 space-y-3 max-h-screen h-screen">
        <h1 className="text-5xl font-thin text-gray-50">Create Note</h1>
        <div className="divider"></div>
        <div className="label pb-0">
          <span className="label-text">Select Document</span>
        </div>
        <select
          className="select select-primary w-full max-w-xs"
          onChange={(event) => setDocumentKey(event.target.value)}
        >
          <option disabled selected>
            Select Document
          </option>
          {userDocuments.map((document) => (
            <option value={document}>{parseDocumentName(document)}</option>
          ))}
        </select>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Add your note contents here</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-72 textarea-primary"
            placeholder="Note Contents"
            onChange={(event) => setNoteContents(event.target.value)}
          ></textarea>
        </label>

        <button
          className="btn btn-outline btn-primary"
          onClick={handleNoteCreation}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
