import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { ReducersCases } from "@/types/types";
import { setContactPage } from "@/store/reducers/mainSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatListHeader() {
  /* const {
    state: { userInfo },
    dispatch,
  } = useStateProvider(); */
  const userInfo = useSelector((state) => state.main.userInfo);
  const dispatch = useDispatch();

  const handleAllContactsPage = () => {
    dispatch(setContactPage());
  };

  return (
    <div className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profilePicture as string} />
      </div>
      <div className="flex gap-6">
        <BsFillChatLeftTextFill
          className="text-panel-header-icon cursor-pointer text-xl"
          title="New Chat"
          onClick={() => handleAllContactsPage()}
        />
        <>
          <BsThreeDotsVertical
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Menu"
          />
        </>
      </div>
    </div>
  );
}

export default ChatListHeader;
