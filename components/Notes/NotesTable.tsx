import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  const [formOpen, setFormOpen] = useState("");

  useEffect(() => {
    const handleNotesGetter = async () => {
      const response = await fetch(`/api/notes?id=${user_id}`);
      const result = await response.json();
      setUserNotes(result.body);
    };

    handleNotesGetter();
  }, []);

  const handleNoteEdit = (
    note_content: string,
    document_key: string,
    note_id: string
  ) => {
    setNoteEdit({
      note_content,
      document_key,
      note_id,
    });
    showForm(true);
  };

  return (
    <div>
      <div
        className="bg-black w-screen overflow-scroll"
        style={{ height: "93vh" }}
      >
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th>Note ID</th>
              <th>Attached Document</th>
              <th>Creation Date</th>
              <th>Update Date</th>
              <th>Render Note</th>
            </tr>
          </thead>
          <tbody>
            {userNotes.map(
              (
                note: {
                  id: string;
                  timestamp: string;
                  content: string;
                  document_key: string;
                },
                index
              ) => (
                <tr key={index}>
                  <th>{index}</th>
                  <td>{note.id}</td>
                  <td>{note.document_key}</td>
                  <td>{note.timestamp}</td>
                  <td>
                    <div className="px-2"></div>

                    <button
                      className="btn btn-outline btn-primary"
                      disabled={isFormOpen}
                      onClick={() =>
                        handleNoteEdit(note.content, note.document_key, note.id)
                      }
                    >
                      Edit Note
                    </button>
                  </td>
                  <td>
                    <label
                      htmlFor={`my_modal_${note.id}`}
                      className="btn bg-cyan-100/5 text-white border-2 border-cyan-50"
                    >
                      Display Note Content
                    </label>
                    <input
                      type="checkbox"
                      id={`my_modal_${note.id}`}
                      className="modal-toggle"
                    />
                    <div className="modal" role="dialog">
                      <div className="modal-box">
                        <h3 className="text-lg font-bold py-2">Note Content</h3>

                        <h4 className="divider">{note.document_key}</h4>

                        <div className="mockup-code bg-black text-white px-4">
                          <pre>
                            <code>{note.content || "None"}</code>
                          </pre>
                        </div>

                        <div className="modal-action">
                          <label
                            htmlFor={`my_modal_${note.id}`}
                            className="btn"
                          >
                            Close
                          </label>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
