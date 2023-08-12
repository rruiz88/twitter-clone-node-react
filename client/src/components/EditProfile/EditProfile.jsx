import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { changeProfile, logout } from "../../redux/userSlice";
import app from "../../firebase";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setOpenModal }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // user doesnt have access
            break;
          case "storage/cancelled":
            // user cancelled upload
            break;
          case "storage/unknown":
            // unknown error
            break;
          default:
            break;
        }
      },
      () => {
        // upload successful
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            const updateProfile = await axios.put(`/user/${currentUser._id}`, {
              profilePicture: downloadURL,
            });
            console.log("File available at", downloadURL);
          } catch (err) {
            console.log(err);
          }
          dispatch(changeProfile(downloadURL));
        });
      }
    );
  };

  const deleteHandler = async () => {
    const deleteProfile = await axios.delete(`/user/${currentUser._id}`);
    dispatch(logout());
    navigate("/signin");
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button
          onClick={() => setOpenModal(false)}
          className="absolute top-3 right-3 cursor-pointer"
        >
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>photo</p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            accept="image/*"
            className="bg-transparent border border-slate-500 rounded p-2"
            onChange={(e) => setImg(e.target.files[0])}
          ></input>
        )}

        <button
          onClick={deleteHandler}
          className="bg-red-500 text-white py-2 rounded-full"
        >
          Delete account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
