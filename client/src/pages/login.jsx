import React from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

import { auth } from "@/utils/FirebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { displayName: name, email, photoUrl: profileImage },
    } = await signInWithPopup(auth, provider);
    try {
      if(email){}
    } catch (err) {
      console.log(err)
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
