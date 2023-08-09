import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Tweet from "../Tweet/Tweet";

const ExploreTweet = () => {
  const [explore, setExplore] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const exploreTweet = await axios.get("/tweets/explore");
        setExplore(exploreTweet.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser._id]);

  return (
    <div className="mt-6">
      {explore &&
        explore.map((tweet) => {
          return (
            <div key={tweet._id} className="p-2">
              <Tweet tweet={tweet} setData={setExplore} />
            </div>
          );
        })}
    </div>
  );
};

export default ExploreTweet;
