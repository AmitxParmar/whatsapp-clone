import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";

function ChatListHeader() {
  const {
    state: { userInfo },
  } = useStateProvider();

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profileImage as string} />
      </div>
      <div className="flex"></div>
    </div>
  );
}

export default ChatListHeader;
