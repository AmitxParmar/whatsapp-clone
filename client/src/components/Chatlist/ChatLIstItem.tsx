import { IUserProfile } from "@/types/types";
import React from "react";

interface IChatListItem {
  isContactPage: boolean;
  data: IUserProfile[];
}

function ChatListItem({ isContactPage, data }: IChatListItem) {
  console.log({ isContactPage, data });
  return <div>ChatLIstItem</div>;
}

export default ChatListItem;
