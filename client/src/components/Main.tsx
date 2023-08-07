import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";

import { auth } from "@/utils/FirebaseConfig";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";

import Chat from "./Chat/Chat";

import { useDispatch, useSelector } from "react-redux";
import { setMessages, setUserInfo } from "@/store/reducers/mainSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { IMessage } from "@/types/types";

function Main() {
  const router = useRouter();

  const { userInfo, currentChatUser } = useSelector(
    (state: RootState) => state.main
  );

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

  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await axios.get<IMessage[]>(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );

      dispatch(setMessages(messages));
    };
    console.log(`${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`);
    console.log(
      currentChatUser?.id && userInfo?.id,
      "current user id the run the getMessage"
    );
    if (currentChatUser?.id && userInfo?.id) {
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
