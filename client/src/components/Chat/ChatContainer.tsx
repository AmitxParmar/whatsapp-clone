import { useStateProvider } from "@/context/StateContext";
import React from "react";

function ChatContainer() {
  const {
    state: { messages, currentChatUser },
  } = useStateProvider();

  /*  const isEven = (index: number): boolean => {
    const n = Number(index);
    return n === 0 || !!(n && !(n % 2));
  }; */

  return (
    <div className="h-[80vh] relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5  left-0 top-0 z-0">
        <div className="mx-10 my-6 relative bottom-0 z-40"></div>
        <div className="opacity-100 flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            <span className="text-white">asdasd</span>
            <span className="text-white">asdasd</span>
            {void console.log(messages, "messages")}
            {messages?.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${
                  message.senderId === currentChatUser?.id
                    ? " justify-start"
                    : " justify-end"
                }`}
              >
                {void console.log(message, "message")}
                {message.type === "text" && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                      message.senderId === currentChatUser?.id
                        ? " bg-incoming-background"
                        : " bg-outgoing-background"
                    }`}
                  >
                    <span className="break-all">{message.message}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
