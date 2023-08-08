import axios from "axios";
import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { RootState } from "@/store/store";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import type { Socket } from "socket.io-client";
import OutsideClick from "../OutsideClickHandler";
import PhotoPicker from "../common/PhotoPicker";
function MessageBar() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setEmojiPicker] = useState(false);
  const [grabPhoto, setGrabPhoto] = useState(false);
  const [image, setImage] = useState("");

  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const handleEmojiModal = (): void => setEmojiPicker(!showEmojiPicker);
  const handleEmojiClick = (emoji: EmojiClickData) => {
    setMessage((prevMsg) => (prevMsg += emoji.emoji));
  };

  const { userInfo } = useSelector((state: RootState) => state.user);
  const { currentChatUser, socket } = useSelector(
    (state: RootState) => state.chat
  );

  const isValid = message === "";

  const sendMessage = async () => {
    if (isValid) return console.log("message is empty");
    try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
      (socket as Socket).emit("send-msg", {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message: data.message,
      });

      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const photoPickerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event: ProgressEvent<FileReader>) {
      data.src = event?.target?.result as string;
      data.setAttribute("data-src", event?.target?.result as string);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage?.(data?.src);
    }, 100);
  };

  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data?.click();
      document.body.onfocus = (e) => {
        setTimeout(() => {
          setGrabPhoto(false);
        }, 1000);
      };
    }
  }, [grabPhoto]);

  return (
    <div className="bg-panel-header-background h-20 py-12 px-4 flex items-center gap-6 relative ">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
            id="emoji-open"
            onClick={handleEmojiModal}
          />
          {showEmojiPicker && (
            <OutsideClick onOutsideClick={handleEmojiModal}>
              <div
                className="absolute bottom-24 left-16 z-40"
                ref={emojiPickerRef}
              >
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            </OutsideClick>
          )}
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach File"
            onClick={() => setGrabPhoto(true)}
          />
        </div>
        <div className="w-full rounded-lg h-10 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            className="bg-input-background text-sm focus:outline-none text-white h-10 rounded-lg px-5 py-4 w-full"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <div className="flex w-10 items-center justify-center">
          <button className={`${isValid ? "opacity-20" : null}`}>
            <MdSend
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Send message"
              onClick={() => sendMessage()}
            />
            <FaMicrophone
              className="text-panel-header-icon cursor-pointer text-xl"
              title="Record"
            />
          </button>
        </div>
      </>
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </div>
  );
}

export default MessageBar;
