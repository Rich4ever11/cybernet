import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import UserNoteCard from "../Home/Card/UserNoteCard";

type Props = {
  user_id: string;
  setNoteEdit: Dispatch<SetStateAction<any>>; //empty object
  showForm: Dispatch<SetStateAction<boolean>>;
  isFormOpen: boolean;
};

export default function NotesTable({
  user_id,
  setNoteEdit,
  showForm,
  isFormOpen,
}: Props) {
  const [userNotes, setUserNotes] = useState([]);
  const [userNotesSearch, setUserNotesSearch] = useState([]);
  const [formOpen, setFormOpen] = useState("");

  useEffect(() => {
    const handleNotesGetter = async () => {
      const response = await fetch(`/api/notes/ai?id=${user_id}`);
      const result = await response.json();
      console.log(result.body);
      setUserNotes(result.body);
      setUserNotesSearch(result.body);
    };

    handleNotesGetter();
  }, []);

  const parseDocumentKey = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleNoteSearch = (searchQuery: string) => {
    const newUserNotes = userNotes;

    const filteredLocations = searchQuery
      ? newUserNotes.filter((note: any) =>
          note?.note_content?.includes(searchQuery)
        )
      : userNotes;
    setUserNotesSearch(filteredLocations);
  };

  const handleNoteEdit = (
    note_content: string,
    note_id: string,
    chat_id: number
  ) => {
    console.log(note_content, note_id, chat_id);
    setNoteEdit({
      note_content,
      note_id,
      chat_id,
    });
    showForm(true);
  };

  return (
    <div>
      <div
        className="bg-black w-screen overflow-scroll"
        style={{ height: "93vh" }}
      >
        <div className="flex flex-col m-4">
          <h3 className="text-white font-thin">Search Notes</h3>
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
            onChange={(event) => handleNoteSearch(event.target.value)}
          />
        </div>

        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Attached Document</th>
              <th>Creation Date</th>
              <th>Modify Note</th>
              <th>Render Note</th>
            </tr>
          </thead>
          <tbody>
            {userNotesSearch.map((ai_note: any, index) => (
              <tr key={index}>
                <th>{index}</th>
                <td>{parseDocumentKey(ai_note.document_id)}</td>
                <td>{ai_note.note_created_at || "Note Not Found"}</td>
                <td>
                  <div className="px-2"></div>

                  {ai_note.note_id ? (
                    <>
                      <button
                        className="btn btn-outline btn-primary"
                        disabled={isFormOpen}
                        onClick={() =>
                          handleNoteEdit(
                            ai_note.note_content || "",
                            ai_note.note_id || null,
                            ai_note.chat_id
                          )
                        }
                      >
                        Edit Note
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline btn-primary"
                        disabled={isFormOpen}
                        onClick={() =>
                          handleNoteEdit(
                            ai_note.note_content || "",
                            ai_note.note_id || null,
                            ai_note.chat_id
                          )
                        }
                      >
                        Create Note
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <label
                    htmlFor={`my_modal_${ai_note.note_id}`}
                    className="btn bg-cyan-100/5 text-white border-2 border-cyan-50"
                  >
                    Display AI Content
                  </label>
                  <input
                    type="checkbox"
                    id={`my_modal_${ai_note.note_id}`}
                    className="modal-toggle"
                  />
                  <div className="modal" role="dialog">
                    <div className="modal-box">
                      <h3 className="text-2xl font-thin py-2 text-white">
                        AI Discourse
                      </h3>

                      <UserNoteCard
                        noteId={ai_note.document_id}
                        document={parseDocumentKey(ai_note.document_id)}
                        userQuestion={ai_note.user_question}
                        cybernetResponse={ai_note.model_response}
                        created_at={ai_note.chat_created_at}
                        username={"user"}
                      />

                      <div className="mockup-code bg-black text-white px-4">
                        <h3 className="text-xl font-thin py-2 text-white">
                          Question Note
                        </h3>
                        <pre>
                          <code>{ai_note.note_content || "None"}</code>
                        </pre>
                      </div>

                      <div className="modal-action">
                        <label
                          htmlFor={`my_modal_${ai_note.note_id}`}
                          className="btn"
                        >
                          Close
                        </label>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
