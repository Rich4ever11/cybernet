import React, { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { GiCyberEye } from "react-icons/gi";

type Props = {};

export default function Chat({}: Props) {
  const [question, setQuestion] = useState<string>("");
  const [messageConversation, setMessageConversation] = useState({});

  const handleQuestionInput = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestion(event.target.value);
  };

  const handleAIRequest = async () => {
    const data = {};
    const res = await fetch("/api/ai/openai", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    console.log(responseData);
  };

  return (
    <>
      <div
        style={{ height: "90vh", overflow: "scroll" }}
        className="grid grid-cols-1 place-content-end"
      >
        <div className="">
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <GiCyberEye color={"white"} size={42} />{" "}
              </div>
            </div>
            <div className="chat-header text-white">
              Cybernet AI <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble text-white">
              You were the Chosen One!
            </div>
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
              Anakin <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble text-white">
              What is the main information in this document
            </div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
      </div>
      <div className="flex flex-row p-4">
        <input
          type="text"
          placeholder="Type Your Question Here"
          className="input input-bordered border-white border-2 w-full max-w-full text-white"
          value={question}
          onChange={handleQuestionInput}
        />
        <div className="px-2">
          <button
            className="btn btn-circle btn-outline border-0"
            onClick={handleAIRequest}
          >
            <FiArrowUpCircle size={42} color="white " />
          </button>
        </div>
      </div>
    </>
  );
}
