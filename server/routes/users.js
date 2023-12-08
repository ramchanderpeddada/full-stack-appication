import express from "express";

import { verifyToken } from "../middleware/auth.js";
import { getUserPosts } from "../controllers/posts.js";
import { addRemoveFriend, getUserFriends } from "../controllers/users.js";

const router = express.Router();

router.get("/:id", verifyToken, getUserPosts);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/friends", verifyToken, addRemoveFriend);

export default router;
