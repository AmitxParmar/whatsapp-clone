import { IUserProfile, ReducersCases } from "@/types/types";
import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { useDispatch } from "react-redux";
import {
  changeCurrentChatUser,
  setContactPage,
} from "@/store/reducers/mainSlice";

interface IChatListItem {
  isContactPage: boolean;
  data: IUserProfile;
}

const ChatListItem = ({ isContactPage = false, data }: IChatListItem) => {
  /*  const {
    state: { userInfo, currentChatUser },
    dispatch,
  } = useStateProvider(); */
  const dispatch = useDispatch();

  const handleContactClick = () => {
    console.log("handleContactClick");
    /* if (currentChatUser?.id === data?.id) { */
    console.log(data, "currentUser state, ChatLisetitem");

    dispatch(changeCurrentChatUser(data));

    dispatch(setContactPage());
    /* } */
  };

  return (
    <div
      className={`flex py-3 cursor-pointer items-center hover:bg-background-default-hover ${
        isContactPage && null
      }`}
      onClick={() => handleContactClick()}
    >
      <div className="min-w-fit px-5  pb-1">
        <Avatar type="lg" image={data?.profilePicture as string} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 p3-2">
          <div className="flex justify-between w-full">
            <span className="text-secondary line-clamp-1 text-sm">
              {data?.about || "\u00A0"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
