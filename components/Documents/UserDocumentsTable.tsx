import React, { useState } from "react";
import { UserDocumentDisplay } from "@/components/Documents/UserDocumentDisplay";
import { IoDocumentLockSharp } from "react-icons/io5";

interface DocumentMetaData {
  Key: string;
  LastModified: string;
  ETag: string;
  Size: string;
  StorageClass: string;
}

interface DocumentRenderMetadata {
  contentType: string;
  expiration: string;
  lastModified: Date;
  contentLength: number;
  encryption: string;
}

type Props = {
  userDocuments: DocumentMetaData[];
  updateUserDocuments?: any;
  firstName: string;
  lastName: string;
};

export default function UserDocumentsTable({
  userDocuments,
  updateUserDocuments,
  firstName,
  lastName,
}: Props) {
  const [dynamicDocs, setDynamicDocs] = useState<any>([]);
  const [checkedFile, setCheckedFile] = useState<any>("");
  const [renderedDocument, setRenderedDocument] = useState<string>("");
  const [renderDocumentMetadata, setRenderDocumentMetadata] =
    useState<DocumentRenderMetadata>();

  const [docUpdate, setDocUpdate] = useState<boolean>(false);

  const parseDocumentName = (fullDocumentPath: string) => {
    const pathSplit = fullDocumentPath.split("/");
    return pathSplit[pathSplit.length - 1];
  };

  const handleDocumentRender = async (documentKey: string) => {
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
    const contentType = responseData.metadata.contentType;
    const documentBlob = new Blob([byteArrayConverted], {
      type: contentType,
    });

    console.log(responseData.metadata);
    const objectURL = URL.createObjectURL(documentBlob);
    setRenderedDocument(documentKey);
    setRenderDocumentMetadata(responseData.metadata);
    setDynamicDocs([
      {
        uri: objectURL,
      },
    ]);
    updateUserDocuments();
  };

  const handleDocumentDeletion = async () => {
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
      const response = (await result).json;
      updateUserDocuments();
    }
  };

  return (
    <div>
      <div className="flex md:flex-row flex-col h-1/2">
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
                    <tr
                      key={index}
                      className={
                        (renderedDocument === document.Key && `bg-slate-800`) ||
                        ""
                      }
                    >
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
                        {parseDocumentName(document.Key)}
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
            {checkedFile && (
              <div className="p-4">
                <button
                  className="btn text-white bg-red-950"
                  onClick={handleDocumentDeletion}
                >
                  Delete Documents
                </button>
              </div>
            )}
            <div className="divider"></div>

            {renderDocumentMetadata && (
              <div className="m-2">
                <div className="bg-black image-full w-full shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title text-white text-6xl font-thin ">
                      {parseDocumentName(renderedDocument)}
                    </h2>

                    <div className="divider"></div>

                    <div className="bg-slate-900 p-8">
                      <h2 className="card-title text-white text-4xl font-thin ">
                        {"Document Information"}
                      </h2>
                      <div className="divider"></div>

                      <p className="text-white text-2xl font-thin">
                        <span className="text-slate-300">
                          Document Expire Date:
                        </span>{" "}
                        {renderDocumentMetadata.expiration.split('"')[1]}
                      </p>

                      <p className="text-white text-2xl font-thin">
                        <span className="text-slate-300">
                          Document Content Type:{" "}
                        </span>{" "}
                        {renderDocumentMetadata.contentType}
                      </p>
                      <p className="text-white text-2xl font-thin">
                        <span className="text-slate-300">
                          Document Content Length:{" "}
                        </span>{" "}
                        {renderDocumentMetadata.contentLength}
                      </p>

                      <p className="text-white text-2xl font-thin">
                        <span className="text-slate-300">
                          Document Encryption Type:{" "}
                        </span>{" "}
                        {renderDocumentMetadata.encryption}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
