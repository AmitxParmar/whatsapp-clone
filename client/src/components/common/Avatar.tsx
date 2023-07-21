import Image from "next/image";
import React, {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { FaCamera } from "react-icons/fa";

import ContextMenu from "./ContextMenu";
import PhotoPicker from "./PhotoPicker";

interface IAvatar {
  type: "sm" | "lg" | "xl";
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const Avatar: React.FC<IAvatar> = ({ type, image, setImage }) => {
  const [hover, setHover] = useState<boolean>(false);
  const [grabPhoto, setGrabPhoto] = useState<boolean>(false);

  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const [contextMenuCordinates, setContextMenuCordinates] = useState({
    x: 0,
    y: 0,
  });
  const showContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenuCordinates({
      x: e.pageX,
      y: e.pageY,
    });
    setIsContextMenuVisible(true);
  };
  useEffect(() => {
    if (grabPhoto) {
      const data = document.getElementById("photo-picker");
      data?.click();
      document.body.onfocus = (e) => {
        setGrabPhoto(false);
      };
    }
  }, []);
  const contextMenuOptions = [
    { name: "Take Photo", callback: () => {} },
    { name: "Choose From Library", callback: () => {} },
    {
      name: "Upload Photo",
      callback: () => {
        setGrabImage(true);
      },
    },
    {
      name: "Remove Photo",
      callback: () => {
        setImage("/default_avatar.png");
      },
    },
  ];

  const photoPickerChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    const data = document.createElement("img");
    reader.onload = function (event: ProgressEvent<FileReader>) {
      data.src = event.target?.result as string;
      data.setAttribute("data-src", event?.target?.result as string);
    };
    reader.readAsDataURL(file);
    setTimeout(() => {
      setImage(!data.src);
    }, 100);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {type === "sm" && (
          <div className="relative h-10 w-10">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "lg" && (
          <div className="relative h-14 w-14">
            <Image src={image} alt="avatar" className="rounded-full" fill />
          </div>
        )}
        {type === "xl" && (
          <div
            className="relative cursor-pointer z-0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div
              className={`z-10 bg-photopicker-overlay-background h-60 w-60 absolute top-0 left-0 flex items-center rounded-full justify-center flex-col text-center gap-2 ${
                hover ? "visible" : "hidden"
              }`}
              onClick={(e) => showContextMenu(e)}
            >
              <FaCamera className="text-2xl" id="context-opener" />
              <span>Change Profile Photo</span>
            </div>
            <div className="h-60 w-60">
              <Image src={image} alt="avatar" className="rounded-full" fill />
            </div>
          </div>
        )}
      </div>
      {isContextMenuVisible && (
        <ContextMenu
          options={contextMenuOptions}
          cordinates={contextMenuCordinates}
          contextMenu={isContextMenuVisible}
          setContextMenu={setIsContextMenuVisible}
        />
      )}
      {grabPhoto && <PhotoPicker onChange={photoPickerChange} />}
    </>
  );
};

export default Avatar;
