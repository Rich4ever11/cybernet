import React from "react";
import { GiCyberEye } from "react-icons/gi";

type Props = {
  noteId: number;
  document: string;
  userQuestion: string;
  cybernetResponse: string;
  created_at: number;
  username: string;
};

export default function UserNoteCard({
  document,
  userQuestion,
  cybernetResponse,
  created_at,
  username,
}: Props) {
  return (
    <div>
      <div className="card bg-zinc-950 w-96 shadow-xl m-8">
        <div className="card-body">
          <div className="divider text-2xl overflow-x-scroll py-4 text-white">
            {document}
          </div>
          <div className="overflow-y-scroll max-h-72">
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
                {username}{" "}
                <time className="text-xs opacity-50">{created_at}</time>
              </div>
              <div className="chat-bubble text-white">{userQuestion}</div>
              <div className="chat-footer opacity-50">Seen at {created_at}</div>
            </div>
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <GiCyberEye color={"white"} size={42} />{" "}
                </div>
              </div>
              <div className="chat-header text-white">
                Cybernet AI{" "}
                <time className="text-xs opacity-50">{created_at}</time>
              </div>
              <div className="chat-bubble text-white">{cybernetResponse}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
