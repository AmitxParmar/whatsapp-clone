import { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE, GET_MESSAGES_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";
import { ReducersCases } from "@/types/types";

function Main() {
  const router = useRouter();
  const {
    state: { userInfo, currentChatUser },
    dispatch,
  } = useStateProvider();

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
        dispatch({
          type: ReducersCases.SET_USER_INFO,
          userInfo: {
            id,
            name,
            email,
            profilePicture,
            about,
          },
        });
      }
    }
  });
  console.log(currentChatUser,'current User');
  useEffect(() => {
    const getMessages = async () => {
      const { data: messages } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo?.id}/${currentChatUser?.id}`
      );
      console.log("isThis messages string?", typeof messages, messages);
      dispatch({ type: ReducersCases.SET_MESSAGES, messages });
    };
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
