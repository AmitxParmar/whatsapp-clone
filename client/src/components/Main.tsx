import { useEffect, useState } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import Chat from "./Chat/Chat";


function Main() {
  const router = useRouter();
  const {
    state: { userInfo },
    dispatch,
  } = useStateProvider();

  const [redirectLogin, setRedirectLogin] = useState<boolean>(false);
  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, []);
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) setRedirectLogin(true);
    if (!userInfo && currentUser?.email) {
      const { data } = await axios.post(CHECK_USER_ROUTE, {
        email: currentUser.email,
      });
      if (!data.status) {
        router.push("/login");
      }
      dispatch;
    }
  });
  return (
    <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full over">
      <ChatList />
      {/* <Empty /> */}
      <Chat />
    </div>
  );
}

export default Main;
