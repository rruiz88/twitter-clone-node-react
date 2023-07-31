import Tweet from "../models/Tweet.js";
import errorHandler from "../errors.js";
import User from "../models/User.js";

export const createTweet = async (req, res, next) => {
  const newTweet = new Tweet(req.body);
  try {
    const savedTweet = await newTweet.save();
    res.status(200).json(savedTweet);
  } catch (err) {
    next(errorHandler(500, err));
  }
};

export const deleteTweet = async (req, res, next) => {
  try {
    // grab id of tweet
    const tweet = await Tweet.findById(req.params.id);
    if (tweet.userId === req.body.id) {
      await tweet.deleteOne();
      res.status(200).json("Tweet has been deleted!");
    } else {
      errorHandler(500, err);
    }
  } catch (err) {
    next(errorHandler(500, err));
  }
};

export const likeOrDislike = async (req, res, next) => {
  try {
    // grab tweet id
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet.likes.includes(req.body.id)) {
      await tweet.updateOne({
        $push: {
          likes: req.body.id,
        },
      });
      res.status(200).json("Tweet has been liked!");
    } else {
      await tweet.updateOne({
        $pull: { likes: req.body.id },
      });
      res.status(200).json("Tweet has been disliked!");
    }
  } catch (err) {
    errorHandler(500, err);
  }
};

export const getAllTweets = async (req, res, next) => {
  try {
    // grab logged User id
    const loggedUser = await User.findById(req.params.id);
    // grab logged in users tweets
    const loggedUserTweets = await Tweet.find({ userId: loggedUser._id });
    //grab followers tweets
    const followersTweets = await Promise.all(
      loggedUser.following.map((followerId) => {
        return Tweet.find({ userId: followerId });
      })
    );
    res.status(200).json(loggedUserTweets.concat(...followersTweets));
  } catch (err) {
    errorHandler(500, err);
  }
};

export const getUserTweets = async (req, res, next) => {
  try {
    // grab logged in users tweets
    const loggedUserTweets = await Tweet.find({ userId: req.params.id }).sort({
      createAt: -1,
    });

    res.status(200).json(loggedUserTweets);
  } catch (err) {
    errorHandler(500, err);
  }
};

export const getExploreTweets = async (req, res, next) => {
  try {
    // grab tweets that are liked sort most to least
    const exploreTweets = await Tweet.find({ likes: { $exists: true } }).sort({
      likes: -1,
    });

    res.status(200).json(exploreTweets);
  } catch (err) {
    errorHandler(500, err);
  }
};
