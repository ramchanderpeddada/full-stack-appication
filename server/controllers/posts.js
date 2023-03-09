import PostMsg from "../models/postMsg.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMsg.find();
    res.status(200).json(postMessages);
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
  }
};
