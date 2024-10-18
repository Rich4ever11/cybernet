import React from "react";
import { GiCyberEye } from "react-icons/gi";

type Props = {
  noteId: number;
  document: string;
  userQuestion: string;
  cybernetResponse: string;
  username: string;
};

export default function UserNoteCard({
  noteId,
  document,
  userQuestion,
  cybernetResponse,
  username,
}: Props) {
  return (
    <div>
      <div className="card bg-zinc-950 w-96 shadow-xl m-8">
        <div className="card-body">
          <h2 className="card-title font-thin text-2xl">Note Card {noteId}</h2>
          <div className="divider">{document}</div>
          <div className="overflow-y-scroll max-h-72">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <GiCyberEye color={"white"} size={42} />{" "}
                </div>
              </div>
              <div className="chat-header text-white">
                Cybernet AI <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble text-white">{cybernetResponse}</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full border-2 border-white">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div className="chat-header text-white">
                {username} <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble text-white">{userQuestion}</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
