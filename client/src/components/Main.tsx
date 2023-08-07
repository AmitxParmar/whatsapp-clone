import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

import { auth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";

import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";

import { useDispatch, useSelector } from "react-redux";
import { setMessages, setUserInfo } from "@/store/reducers/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { IUserProfile } from "@/types/types";

function Main() {
  const router = useRouter();
  const currentChatUser = useSelector<RootState>(
    (state) => state.main.currentChatUser
  );
  const userInfo = useSelector<RootState>(
    (state) => state.main.userInfo as IUserProfile
  );

  /* const {
    state: { userInfo, currentChatUser },
    dispatch,
  } = useStateProvider(); */
  const dispatch = useDispatch<AppDispatch>();

  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);

  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.status) {
        router.push("/login");
      }
      if (data?.data) {
        const { id, name, email, profilePicture, about } = data.data;
        dispatch(
          setUserInfo({
            id,
            name,
            email,
            profilePicture,
            about,
          })
        );
      }
    }
  });
  useEffect(() => {}, []);
  console.log(currentChatUser, "current User");
  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );

      console.log("isThis messages string?", typeof messages, messages);
      dispatch(setMessages(messages));
    };
    console.log(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`);
    console.log(currentChatUser?.id, "current user id the run the getMessage");
    if (currentChatUser?.id) {
      getMessages();
    }
    console.log("useEffect getMessages triggered");
  }, [currentChatUser]);

  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
      <ChatList />
      {currentChatUser ? <Chat /> : <Empty />}
    </div>
  );
}

export default Main;
