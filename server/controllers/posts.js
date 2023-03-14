import mongoose from "mongoose";
import PostMsg from "../models/postMsg.js";

import express from "express";

const router = express.Router();

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMsg.find();
    res.status(200).json(postMessages);
  } catch (err) {
    console.log(err);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostMsg.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMsg({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { title, message, tags, selectedFile, _id: id };

  await PostMsg.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with id");

  await PostMsg.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully" });
};

// export const likePost = async (req, res) => {
//   const { id } = req.params;

//   if (!req.userId) return res.json({ message: "Unauthorized" });

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send("No post with id");

//   const post = await PostMsg.findById(id);

//   const index = post?.likes.findIndex((id) => id === String(req.userId));

//   if (index !== -1) {
//     post?.likes.push(req.userId);
//   } else {
//     post.likes = post.likes.filter((id) => id !== String(req.userId));
//   }

//   const updatedPost = await PostMsg.findByIdAndUpdate(id, post, {
//     new: true,
//   });
//   res.status(200).json(updatedPost);
// };
export default router;
