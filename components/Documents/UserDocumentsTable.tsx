import React, { useState } from "react";
import { UserDocumentDisplay } from "@/components/Documents/UserDocumentDisplay";

interface DocumentMetaData {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: string;
  StorageClass: string;
}

type Props = {
  userDocuments: DocumentMetaData[];
  firstName: string;
  lastName: string;
};

export default function UserDocumentsTable({
  userDocuments,
  firstName,
  lastName,
}: Props) {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [checkedFile, setCheckedFile] = useState<any>("");
  const [renderedDocument, setRenderedDocument] = useState<string>("");

  const parseDocument = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleDocumentRender = async (documentKey: string) => {
    setDynamicDocs([]);
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
    const contentType = responseData["contentType"];
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

  const handleDocumentDeletion = () => {
    if (checkedFile) {
      const data = {
        documentKey: checkedFile,
      };
      console.log("DELETED", checkedFile);
      const result = fetch("/api/document/delete", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
        body: JSON.stringify(data),
      });
    }
  };

  return (
    <div>
      <div className="py-6 px-2 my-2 bg-black">
        <h1 className="text-6xl font-thin">Document Center</h1>
      </div>
      <div className="flex flex-row h-full">
        <div className="basis-6/12 bg-black">
          <div className="overflow-x-auto bg-black max-w-full max-h-screen">
            <table className="table bg-black">
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
                          <input
                            checked={document.Key === checkedFile}
                            type="checkbox"
                            className="checkbox"
                            onChange={(event) => setCheckedFile(document.Key)}
                          />
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
                          className="btn btn-ghost btn-md"
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
                  <th></th>
                  <th>Name</th>
                  <th>Document Name</th>
                  <th>Size</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <div className="p-4">
              <button
                className="btn text-white bg-red-950"
                onClick={handleDocumentDeletion}
              >
                Delete Documents
              </button>
            </div>
          </div>
        </div>

        <div className="basis-6/12">
          <UserDocumentDisplay
            key={dynamicDocs}
            dynamicDocsProp={dynamicDocs}
          />
        </div>
      </div>
    </div>
  );
}
