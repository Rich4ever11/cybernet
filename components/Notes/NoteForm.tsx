"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  userDocuments: string[];
  userId: string;
  editNote?: {
    note_content: string;
    document_key: string;
    note_id: string;
  };
  showForm: Dispatch<SetStateAction<boolean>>;
};
export default function NoteForm({
  userDocuments,
  userId,
  editNote,
  showForm,
}: Props) {
  userDocuments = editNote?.document_key
    ? [editNote?.document_key]
    : userDocuments;
  const [documentKey, setDocumentKey] = useState<string>(
    editNote?.document_key || ""
  );
  const [noteContents, setNoteContents] = useState<string>(
    editNote?.note_content || ""
  );
  const parseDocumentName = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleNoteCreation = async () => {
    try {
      console.log(noteContents, documentKey);
      if (noteContents && documentKey) {
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
        if (responseData) {
          console.log("Successfully added note");
          setNoteContents("");
          showForm(false);
          location.reload();
        }
      }
    } catch (error) {
      console.log("Failed To Create Note");
    }
  };

  const handleNoteUpdate = async () => {
    try {
      if (noteContents && documentKey) {
        const note_id = editNote?.note_id;
        const data = {
          note_id: note_id,
          documentKey: documentKey,
          note_contents: noteContents,
          user_id: userId,
        };
        console.log(data);
        const res = await fetch("/api/notes", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "PUT",
          body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log(responseData);
        if (responseData) {
          console.log("Successfully updated note");
          showForm(false);
          location.reload();
        }
      }
    } catch (error) {
      console.log("Failed To Update Note");
    }
  };

  const handleNoteDeletion = async () => {
    try {
      if (editNote?.note_id) {
        const data = {
          note_id: editNote?.note_id,
          documentKey: documentKey,
          user_id: userId,
        };
        const res = await fetch("/api/notes", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log(responseData);
        if (responseData) {
          console.log("Successfully deleted note");
          showForm(false);
          location.reload();
        }
      }
    } catch (error) {
      console.log("Failed To Delete Note");
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
          defaultValue={documentKey}
          onChange={(event) => setDocumentKey(event.target.value)}
        >
          <option disabled selected value={documentKey}>
            Select Document
          </option>
          {userDocuments.map((document, index: number) => (
            <option value={document} key={index}>
              {parseDocumentName(document)}
            </option>
          ))}
        </select>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Add your note contents here</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-72 textarea-primary"
            placeholder="Note Contents"
            value={noteContents}
            onChange={(event) => setNoteContents(event.target.value)}
          ></textarea>
        </label>

        {Object.keys(editNote || {}).length ? (
          <>
            <button
              className="btn btn-outline btn-primary"
              disabled={userDocuments.length == 0}
              onClick={handleNoteUpdate}
            >
              Update Note
            </button>

            <button
              className="btn btn-outline btn-error mx-2"
              disabled={userDocuments.length == 0}
              onClick={handleNoteDeletion}
            >
              Delete Note
            </button>
          </>
        ) : (
          <button
            className="btn btn-outline btn-primary"
            disabled={userDocuments.length == 0}
            onClick={handleNoteCreation}
          >
            Create Note
          </button>
        )}

        <button
          className="btn btn-outline btn-secondary m-1"
          onClick={() => showForm(false)}
        >
          Close Form
        </button>
      </div>
    </div>
  );
}
