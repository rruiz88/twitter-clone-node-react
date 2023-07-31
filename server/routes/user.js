import express from "express";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update User
router.put("/:id", verifyToken, updateUser);

// get User
router.get("/find/:id", getUser);

// delete User
router.delete("/:id", verifyToken, deleteUser);

// follow user
router.put("/follow/:id", verifyToken, followUser);

// unfollow user
router.put("/unfollow/:id", verifyToken, unfollowUser);

export default router;
