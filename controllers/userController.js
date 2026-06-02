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

const getOnePost = async (req, res) => {
  const post = await db.getOnePost(req.body.postId);
  console.log(post);
  res.json(post);
};

const createComment = async (req, res) => {
  const user = req.user.id;
  const post = req.body.postId;
  const content = req.body.content;
  const comment = await db.createComment(user, post, content);
  console.log(comment);
  res.json(comment);
};

export default { home, createPost, getUserPosts, getOnePost, createComment };
