import Image from "next/image";
import React from "react";
import { SetStateAction } from "react";

interface IAvatar {
  type: "sm" | "lg";
  image: string;
  setImage: SetStateAction<string>;
}

function Avatar({ type, image, setImage }) {
  return (
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
    </div>
  );
}

export default Avatar;
