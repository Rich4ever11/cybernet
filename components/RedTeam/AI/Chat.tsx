import React, { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { GiCyberEye } from "react-icons/gi";

type Props = {
  document_key: string;
};

export default function Chat({ document_key }: Props) {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const handleQuestionInput = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestion(event.target.value);
  };

  const handleAIRequest = async () => {
    if (question && document_key) {
      const questionTimeInSeconds = new Date().getTime() / 1000;
      const userMessage = {
        time: questionTimeInSeconds,
        content: question,
        name: "John Henderson",
        role: "user",
      };
      setMessages([...messages, ...[userMessage]]);
      setQuestion("");

      const body = {
        question: question,
        document_key: document_key,
      };
      console.log(body);
      const res = await fetch("/api/ai/bedrock", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      });
      const responseData = await res.json();
      console.log(responseData);
      const aiAnswer = responseData.message.text;
      const answerTimeInSeconds = new Date().getTime() / 1000;

      const aiMessage = {
        time: answerTimeInSeconds,
        content: aiAnswer,
        name: "Cybernet AI",
        role: "assistant",
      };
      setMessages([...messages, ...[userMessage, aiMessage]]);
    }
  };

  return (
    <>
      <div className="">
        <div className="flex flex-col-reverse place-content-end">
          <div
            style={{ height: "90vh" }}
            className="overflow-y-scroll place-content-end"
          >
            {messages.map(
              (
                message: {
                  time: number;
                  content: string;
                  role: string;
                },
                index: number
              ) => (
                <div key={index}>
                  <div
                    className={`chat chat-${
                      message.role === "user" ? "end" : "start"
                    }`}
                  >
                    <div className="chat-image avatar">
                      {message.role === "user" ? (
                        <div className="w-10 rounded-full border-2 border-white">
                          <img
                            alt="Tailwind CSS chat bubble component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                          />
                        </div>
                      ) : (
                        <div className="w-10 rounded-full">
                          <GiCyberEye color={"white"} size={42} />{" "}
                        </div>
                      )}
                    </div>
                    <div className="chat-header text-white">
                      {message.role}{" "}
                      <time className="text-xs opacity-50">{message.time}</time>
                    </div>
                    <div className="chat-bubble text-white">
                      {message.content}
                    </div>
                  </div>
                </div>
              )
            )}
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
