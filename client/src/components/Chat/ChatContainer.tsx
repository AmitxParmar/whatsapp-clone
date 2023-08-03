import React from "react";

function ChatContainer() {
  const messages = ["hello", "whats up?"];
  const isEven = (index: number): boolean => {
    const n = Number(index);
    return n === 0 || !!(n && !(n % 2));
  };

  return (
    <div className="h-[80vh] w-full relative flex-groe overflow-auto custom-scrollbar">
      <div className="bg-chat-background bg-fixed h-full w-full opacity-5 fixed left-0 top-0 z-0">
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={message + index}
                className={`${isEven(index) ? "justify-start" : "justify-end"}`}
              >
                {void console.log(message)}
                {typeof message === "string" && (
                  <div
                    className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                      isEven(index)
                        ? "bg-incoming-background"
                        : "bg-outgoing-background"
                    }`}
                  >
                    <span className="break-all">{message}</span>
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
