import { IUserProfile } from "@/types/types";
import React from "react";
import Avatar from "../common/Avatar";

interface IChatListItem {
  isContactPage: boolean;
  data: IUserProfile;
}

const ChatListItem = ({ isContactPage, data }: IChatListItem) => {
  console.log({ isContactPage, data });
  return (
    <div
      className={`flex cursor-pointer items-center hover:bg-background-default-hover ${
        isContactPage ? "bg-transparent" : "bg-white"
      }`}
    >
      <div className="min-w-fit px-5 pt-3 pb-1">
        <Avatar
          type="lg"
          image={data?.profilePicture as string}
        />
      </div>
    </div>
  );
};

export default ChatListItem;
