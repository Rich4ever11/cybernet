import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { FC, useState } from "react";
import { getUserCookieSession } from "@/util/middleware/cookies";
import "react-pdf/dist/Page/TextLayer.css";

export const DocumentViewer = ({}) => {
  const [dynamicDocs, setDynamicDocs] = useState([]);

  const handleFileUpload = async (event) => {
    const uploadFile = event.target.files[0];
    const userDataResult = await getUserCookieSession();
    const { id } = userDataResult.userData;
    var data = new FormData();
    data.append("data", uploadFile);
    data.append("name", uploadFile.name);
    data.append("contentType", uploadFile.type);
    const response = await fetch(
      `/api/document/upload?file=${uploadFile.name}&id=${id}`,
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

  return (
    <>
      <div>
        <div
          style={{ height: "100vh", overflow: "hidden" }}
          className="px-4 bg-black"
        >
          <div className="bg-neutral-900">
            <div className="label">
              <span className="label-text"></span>
              <span className="label-text-alt text-white">
                Upload Red Teaming Cybersecurity Documents
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
