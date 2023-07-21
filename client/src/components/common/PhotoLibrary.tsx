import React, { Dispatch, SetStateAction } from "react";

interface IPhotoLibrary {
  setImage: Dispatch<SetStateAction<string>>;
  hidePhotoLibrary: Dispatch<SetStateAction<boolean>>;
}

const PhotoLibrary: React.FC<IPhotoLibrary> = () => {
  return <div>PhotoLibrary</div>;
};

export default PhotoLibrary;
