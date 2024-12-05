"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  editNote?: {
    note_content: string;
    note_id: string;
    chat_id: number;
  };
  showForm: Dispatch<SetStateAction<boolean>>;
};
export default function NoteForm({ editNote, showForm }: Props) {
  console.log(editNote?.chat_id);
  const [noteContents, setNoteContents] = useState<string>(
    editNote?.note_content || ""
  );
  const parseDocumentName = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleNoteCreation = async () => {
    try {
      if (noteContents) {
        const currTimeSeconds = Math.floor(Date.now() / 1000);
        const data = {
          chat_id: editNote?.chat_id,
          note_contents: noteContents,
          timestamp: currTimeSeconds,
        };

        const res = await fetch("/api/notes/ai", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });
        const responseData = await res.json();
        if (responseData) {
          console.log("Successfully added AI Note");
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
      if (noteContents) {
        const data = {
          note_id: editNote?.note_id,
          chat_id: editNote?.chat_id,
          note_contents: noteContents,
        };
        console.log(data);
        const res = await fetch("/api/notes/ai", {
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

  return (
    <div className="">
      <div className="bg-black w-auto p-10 space-y-3 max-h-screen h-screen">
        <h1 className="text-5xl font-thin text-gray-50">Create Note</h1>
        <div className="divider"></div>

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

        {editNote?.note_id ? (
          <>
            <button
              className="btn btn-outline btn-primary"
              disabled={editNote?.chat_id == 0}
              onClick={handleNoteUpdate}
            >
              Update Note
            </button>
          </>
        ) : (
          <button
            className="btn btn-outline btn-primary"
            disabled={editNote?.chat_id == 0}
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
