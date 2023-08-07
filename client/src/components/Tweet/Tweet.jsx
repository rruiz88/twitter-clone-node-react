import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import formatDistance from "date-fns/formatDistance";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const Tweet = ({ tweet, setData }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { userData, setUserData } = useState();
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`/users/find/${tweet.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [tweet.userId, tweet.likes, setUserData]);

  const likeHandler = async (event) => {
    event.preventDefault();

    //   try {
    //     const like = await axios.put(`/tweets/${tweet._id}/like`, {
    //       id: currentUser._id,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            {/* <img src="" alt="" /> */}

            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr} </p>
          </div>

          <p>{tweet.description}</p>
          <button onClick={likeHandler}>
            {tweet.likes.includes(currentUser._id) ? (
              <FavoriteIcon className="mr-2 my-2 curse-pointer"></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
            )}
            {tweet.likes.length}
          </button>
        </>
      )}
    </div>
  );
};

export default Tweet;
