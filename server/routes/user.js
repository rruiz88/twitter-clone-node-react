import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// update User
router.put("/:id", verifyToken, updateUser);

// get User
router.get("/find/:id", getUser);

// delete User
router.delete("/:id", verifyToken, deleteUser);

export default router;
