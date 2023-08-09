import React, { useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";
import { useSelector } from "react-redux";
import axios from "axios";

const MainTweet = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [tweetText, setTweetText] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const submitTweet = await axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="Tweet Tweet..."
          maxLength={280}
          className="bg-slate-200 rounded-lg w-full p-2"
        ></textarea>
        <button
          onClick={submitHandler}
          className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
        >
          Tweet!
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
