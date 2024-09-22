"use client";

import React from "react";
import { GiCyberEye } from "react-icons/gi";
import { DocumentViewer } from "./Document.js";

type Props = {};

export default function ({}: Props) {
  return (
    <div className="flex flex-row">
      <div className="max-w-auto border-red-50 p-8 justify-items-center basis-1/4">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <GiCyberEye color={"white"} size={42} />{" "}
            </div>
          </div>
          <div className="chat-header">
            Cybernet AI <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">
            What is the main information in this document
          </div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-error w-full max-w-full"
        />
      </div>
      <div className="basis-3/4">
        <DocumentViewer />
      </div>
    </div>
  );
}
