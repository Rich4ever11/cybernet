import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import React, { FC } from "react";
import dynamic from "next/dynamic";

// const PdfViewerComponent = dynamic(() => import("react-doc-viewer"), {
//   ssr: false,
// });

export const DocumentViewer = ({}) => {
  const docs = [
    {
      uri: "/UnofficialTranscript.pdf", // for remote file
    },
  ];

  return (
    <>
      <div>
        <div style={{ height: "100vh", overflow: "hidden" }} className="p-2">
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
            style={{ maxHeight: "100vh", maxWidth: "100%", overflow: "scroll" }}
          />
        </div>
      </div>
    </>
  );
};
