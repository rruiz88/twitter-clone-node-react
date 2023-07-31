import express from "express";
import { verifyToken } from "../verifyToken.js";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getExploreTweets,
  getUserTweets,
  likeOrDislike,
} from "../controllers/tweet.js";

const router = express.Router();

// create tweet
router.post("/", verifyToken, createTweet);

// delete tweet
router.delete("/:id", verifyToken, deleteTweet);

// like/dislike tweet
router.put("/:id/like", likeOrDislike);

// get all tweets
router.get("/timeline/:id", getAllTweets);

// get logged user tweets
router.get("/user/all/:id", getUserTweets);

// get explore/liked tweets
router.get("/", getExploreTweets);

export default router;
