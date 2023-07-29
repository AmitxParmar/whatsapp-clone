import { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

import { useStateProvider } from "@/context/StateContext";
import { auth } from "@/utils/FirebaseConfig";
import { ReducersCases } from "@/types/types";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";

function login() {
  const router = useRouter();

  const {
    state: { userInfo, newUser },
    dispatch,
  } = useStateProvider();

  useEffect(() => {
    console.log({ userInfo, newUser }, "User,newuserBoolean");

    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoURL: profileImage },
    } = await signInWithPopup(auth, provider);
    try {
      if (email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email });
        console.log(email, "reached email, into dispatch");
        console.log(data, "data from server,,,");
        if (!data.status) {
          console.log(data, data.status, "server status check");
          console.log();
          dispatch({ type: ReducersCases.SET_NEW_USER, newUser: true });
          console.log("dispatch check ", {
            ReducersCases,
            name,
            email,
            profileImage,
          });
          dispatch({
            type: ReducersCases.SET_USER_INFO,
            userInfo: {
              name,
              email,
              profileImage,
              status: "Available",
            },
          });

          router.push("/onboarding");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-screen w-screen gap-6 flex flex-col justify-center items-center bg-panel-header-background">
      <div className="flex items-center justify-center gap-2 text-white">
        <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <button
        className="flex items-center  justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
        onClick={handleLogin}
      >
        <FcGoogle />
        <span className="text-white text-2xl">Login with Google</span>
      </button>
    </div>
  );
}

export default login;
