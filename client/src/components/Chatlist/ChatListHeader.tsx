import Avatar from "../common/Avatar";
import { useDispatch, useSelector } from "react-redux";

import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";

import { setContactPage } from "@/store/reducers/userSlice";
import { RootState } from "@/store/store";

function ChatListHeader() {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
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
