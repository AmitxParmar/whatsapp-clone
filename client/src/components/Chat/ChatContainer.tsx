import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { calculateTime } from "@/utils/CalculateTime";

import MessageStatus from "@/components/common/MessageStatus";

function ChatContainer() {
  const { currentChatUser, userInfo, messages } = useSelector(
    (state: RootState) => state.main
  );

  return (
    <div className="h-[80vh] relative flex-grow overflow-auto custom-scrollbar">
      <div className="bg-chat-background  bg-fixed h-full w-full opacity-5 left-0 top-0 z-0">
        <div className=" mx-10 my-6 relative bottom-0 z-40"></div>
        <div className="flex w-full">
          <div className="flex flex-col justify-end w-full gap-1 overflow-auto">
            {void console.log(messages)}
            {messages
              ? messages?.map((message, index) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === currentChatUser?.id
                        ? " justify-start"
                        : " justify-end"
                    }`}
                  >
                    {message.type === "text" && (
                      <div
                        className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%] ${
                          message.senderId === currentChatUser?.id
                            ? " bg-incoming-background"
                            : " bg-outgoing-background"
                        }`}
                      >
                        <span className="break-all">{message.message}</span>
                        <div className="flex gap-1 items-end">
                          <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
                            {calculateTime(message.createdAt)}
                          </span>
                          <span>
                            {message.senderId === userInfo?.id && (
                              <MessageStatus
                                messageStatus={message.messageStatus}
                              />
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              : "loading......"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatContainer;
