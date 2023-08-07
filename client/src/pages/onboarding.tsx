import Avatar from "@/components/common/Avatar";
import Input from "@/components/common/Input";
import { useStateProvider } from "@/context/StateContext";
import { setNewUser, setUserInfo } from "@/store/reducers/mainSlice";
import { ReducersCases } from "@/types/types";
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function onboarding() {
  const router = useRouter();

  /* const { state, dispatch } = useStateProvider(); */
  const dispatch = useDispatch();
  const { userInfo, newUser } = useSelector((state) => state.main);

  const [name, setName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [image, setImage] = useState<string>("/default_avatar.png");

  useEffect(() => {
    if (!newUser && !userInfo?.email) router.push("/login");
    else if (!newUser && userInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  const onboardUserHandler = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      console.log(email, "email");
      try {
        const { data } = await axios.post(ONBOARD_USER_ROUTE, {
          email,
          name,
          about,
          image,
        });
        console.log(data);
        if (data.status) {
          console.time("before dispatch");
          dispatch(setNewUser(true));
          dispatch(setUserInfo(userInfo));
          console.time("after dispatch");
          router.push("/");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      return false;
    }
    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <Image src={"/whatsapp.gif"} alt="whatsapp" height={300} width={300} />
        <span className="text-7xl">Whatsapp</span>
      </div>
      <h2 className="text-2xl">Create your profile</h2>
      <div className="flex gap-6 mt-6">
        <div className="flex flex-col items-center justify-center mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <div className="flex items-center justify-center">
            <button
              className="flex items-center justify-center gap-7 bg-search-input-container-background p-5 rounded-lg"
              onClick={() => onboardUserHandler()}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type={"xl"} image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}

export default onboarding;
