import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { FC, useState } from "react";
import dynamic from "next/dynamic";
import "react-pdf/dist/Page/TextLayer.css";

// const PdfViewerComponent = dynamic(() => import("react-doc-viewer"), {
//   ssr: false,
// });

export const DocumentViewer = ({}) => {
  const [dynamicDocs, setDynamicDocs] = useState([
    {
      uri: "/UnofficialTranscript.pdf", // for remote file
    },
  ]);

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
        <div style={{ height: "100vh", overflow: "hidden" }} className="p-2">
          <div>
            <input
              type="file"
              className="file-input file-input-ghost w-full max-w-xs"
              onChange={handleFileUpload}
            />
          </div>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={dynamicDocs}
            style={{ maxHeight: "100vh", maxWidth: "100%", overflow: "scroll" }}
          />
        </div>
      </div>
    </>
  );
};
