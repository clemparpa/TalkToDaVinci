import { useEffect, useState } from "react";
import { ChatService, useChat } from "../../services/chat-service.service";
import { ChatProps } from "./chat-component";

export const ChatInputComponent = () => {
  const [question, setQuestion] = useState<string>("");
  const [chat, loading, answering] = useChat();

  const changeQuestion = (event: any) => setQuestion(event.target.value ?? "");

  const sendChat = () => ChatService.service().askQuestion(question);
  const sendChatCreative = () =>
    ChatService.service().askQuestion(question, true);

  const onKeyDown = (e: any) => {
    if (e.key === "Enter") {
      sendChat();
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-3/4 flex flex-col items-center justify-start">
        <button
          disabled={answering}
          onClick={sendChatCreative}
          className="h-9 p-5 rounded-sm flex items-center justify-center border-2 border-gray-50"
        >
          <img
            src="/refresh.svg"
            alt="refresh"
            className="text-gray-30 mr-4 w-3 h-auto"
          />
          <span className="font-mono font-medium text-gray-30 text-base">
            More Creative Response
          </span>
        </button>
        <div className="bg-gray-50 w-full rounded-sm flex items-center justify-between p-4 mt-2">
          <input
            type="text"
            className="w-full outline-none border-none font-mono font-medium bg-transparent pl-2 text-gray-10 text-base"
            placeholder="Demandez à Leonardo Da Vinci"
            value={question}
            onChange={changeQuestion}
            onKeyDown={onKeyDown}
          />
          <button
            className="outline-none border-none"
            onClick={sendChat}
            disabled={answering}
          >
            {!answering ? (
              <img
                src="/send.svg"
                alt="send message to daVinci"
                className="ml-2 rotate-90 text-gray-30"
              />
            ) : (
              <img
                src="/refresh.svg"
                alt="waiting answer from daVinci"
                className="ml-2 animate-spin text-gray-30"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
