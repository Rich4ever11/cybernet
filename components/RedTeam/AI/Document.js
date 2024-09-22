import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/TextLayer.css";

// const PdfViewerComponent = dynamic(() => import("react-doc-viewer"), {
//   ssr: false,
// });

export const DocumentViewer = ({}) => {
  const [dynamicDocs, setDynamicDocs] = useState([]);

  const handleFileUpload = (event) => {
    console.log(event.target.files[0]);
    const objectURL = URL.createObjectURL(event.target.files[0]);
    setDynamicDocs([
      ...dynamicDocs,
      {
        uri: objectURL,
      },
    ]);
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
