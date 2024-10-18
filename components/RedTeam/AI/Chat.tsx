import React, { useState } from "react";
import { FiArrowUpCircle } from "react-icons/fi";
import { GiCyberEye } from "react-icons/gi";

type Props = {};

export default function Chat({}: Props) {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<any>([]);

  const handleQuestionInput = async (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setQuestion(event.target.value);
  };
  console.log(messages);

  const handleAIRequest = async () => {
    const questionTimeInSeconds = new Date().getTime() / 1000;
    const userMessage = {
      time: questionTimeInSeconds,
      content: question,
      name: "John Henderson",
      role: "user",
    };
    const data = {
      question: question,
    };
    const res = await fetch("/api/ai/llama", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
    const responseData = await res.json();
    const aiAnswer = responseData.body.content;
    const answerTimeInSeconds = new Date().getTime() / 1000;

    console.log(responseData);
    setQuestion("");
    const aiMessage = {
      time: answerTimeInSeconds,
      content: aiAnswer,
      name: "Cybernet AI",
      role: "assistant",
    };
    const newMessages = [userMessage, aiMessage];
    setMessages([...messages, ...newMessages]);
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
                <div>
                  <div
                    key={index}
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
