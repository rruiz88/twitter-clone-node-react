import axios from "axios";
import React, { useEffect, useState } from "react";

import Tweet from "../Tweet/Tweet";
import { useSelector } from "react-redux";

const TimelineTweet = () => {
  const [timeline, setTimeline] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          `/tweets/timeline/${currentUser._id}`
        );
        setTimeline(timelineTweets.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {timeline &&
        timeline.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setTimeline} />
            </div>
          );
        })}
    </div>
  );
};

export default TimelineTweet;
