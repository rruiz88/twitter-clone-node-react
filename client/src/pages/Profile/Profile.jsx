import React, { useEffect, useState } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Tweet from "../../components/Tweet/Tweet";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  const [userTweet, setUserTweet] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userTweet = await axios.get(`/tweets/user/all/${id}`);
        const userProfile = await axios.get(`/users/find/${id}`);

        setUserTweet(userTweet.data);
        setUserProfile(userProfile.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser, id]);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>
        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <div className="flex justify-between items-center">
            {/* <img src="" alt="" /> */}
            {currentUser._id === id ? (
              <button
                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Edit Profile
              </button>
            ) : currentUser.following.includes(id) ? (
              <button className="px-4 py-2 bg-blue-500 rounded-full text-white">
                Following
              </button>
            ) : (
              <button className="px-4 py-2 bg-blue-500 rounded-full text-white">
                Follow
              </button>
            )}
          </div>
          <div className="mt-6">
            {userTweet &&
              userTweet.map((tweet) => {
                return (
                  <div className="p-2" key={tweet._id}>
                    <Tweet tweet={tweet} setData={setUserTweet} />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
      {/* {openModal && <EditProfile setOpenModal={setOpenModal} />} */}
    </>
  );
};

export default Profile;
