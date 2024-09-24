"use client";

import React from "react";
import Chat from "./Chat";
import { DocumentViewer } from "./Document.js";

type Props = {};

export default function ({}: Props) {
  return (
    <div className="flex flex-row h-full">
      <div className="max-w-auto border-red-50 px-1 justify-items-center basis-4/12 flex flex-col justify-end bg-neutral-900">
        <Chat />
      </div>
      <div className="basis-8/12">
        <DocumentViewer />
      </div>
    </div>
  );
}
