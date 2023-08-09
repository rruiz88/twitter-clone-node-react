import React from "react";

const EditProfile = ({ setOpenModal }) => {
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
        <button className="bg-red-500 text-white py-2 rounded-full">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
