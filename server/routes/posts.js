import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/:id", verifyToken, getFeedPosts);
router.get("/:id/friends", verifyToken, getUserPosts);

router.patch("/:id/friends", verifyToken, likePost);

export default router;
