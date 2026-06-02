import db from "../db/query.js";

const home = async (req, res) => {
  const user = await db.getUser(req.user.id);
  res.json(user);
};

const createPost = async (req, res) => {
  console.log(req.user, req.body);
  const post = await db.createPost(
    req.user.id,
    req.body.title,
    req.body.content,
  );
  res.json(post);
};

const getUserPosts = async (req, res) => {
  console.log(req.user.id);
  const posts = await db.getUserPosts(req.user.id);
  console.log(posts);
  res.json(posts);
};

export default { home, createPost, getUserPosts };
