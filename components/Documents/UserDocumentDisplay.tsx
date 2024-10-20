import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { FC, useState } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import "react-pdf/dist/Page/TextLayer.css";
import { IDocument } from "react-doc-viewer";

type Props = {
  dynamicDocsProp: any[];
  handleFileContentDisplayCallback?: (fileContent: string) => void;
};

export const UserDocumentDisplay = ({
  dynamicDocsProp,
  handleFileContentDisplayCallback,
}: Props) => {
  const [dynamicDocs, setDynamicDocs] = useState<any>(dynamicDocsProp);

  const handleFileUpload = async (event: any) => {
    const uploadFile = event.target.files[0];
    const userDataResult = await getUserCookieSession();
    const { id } = userDataResult.userData;
    var data = new FormData();
    data.append("data", uploadFile);
    data.append("name", uploadFile.name);
    data.append("contentType", uploadFile.type);
    const response = await fetch(
      `/api/document/upload?file=${uploadFile.name}&id=${id}&contentType=${uploadFile.type}`,
      {
        method: "POST",
        body: data,
      }
    );
    if (response.ok) {
      const objectURL = URL.createObjectURL(event.target.files[0]);
      setDynamicDocs([
        {
          uri: objectURL,
        },
      ]);
    }
  };

  const handleDocumentChange = (document: IDocument) => {
    console.log(document.fileData);
  };

  return (
    <>
      <div>
        <div
          style={{ height: "100vh", overflow: "hidden" }}
          className="px-4 bg-black"
        >
          <div className="bg-black">
            <div className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white">
                Document Uploads are Saved
              </span>
            </div>
            <input
              type="file"
              className="file-input file-input-ghost w-full max-w-xs"
              onChange={handleFileUpload}
            />
          </div>
          {dynamicDocs && (
            <DocViewer
              pluginRenderers={DocViewerRenderers}
              documents={dynamicDocs}
              onDocumentChange={handleDocumentChange}
              style={{
                maxHeight: "100vh",
                maxWidth: "100%",
                overflow: "scroll",
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
