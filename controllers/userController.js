import db from "../db/query.js";
import { prisma } from "../lib/prisma.js";

const profile = async (req, res) => {
  const user = await db.getUser(req.user.id);
  res.json(user);
};

const index = async (req, res) => {
  const user = req.user.id;
  const feedPosts = await db.getFeed(user);
  console.log(feedPosts);
  res.json(feedPosts);
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

const likePost = async (req, res) => {
  const user = req.user.id;
  const post = req.body.postId;
  const likePost = await db.likePost(user, post);
  console.log(likePost);
  res.json(likePost);
};

const followUserRequest = async (req, res) => {
  const follower = req.user.id;
  const target = req.body.targetId;
  const followRequest = await db.followUserRequest(target, follower);
  console.log(followRequest);
  res.json(followRequest);
};

const acceptFollowerRequest = async (req, res) => {
  const user = req.user.id;
  const follower = req.body.followerId;
  const acceptRequest = await db.acceptFollowerRequest(user, follower);
  console.log(acceptRequest);
  res.json(acceptRequest);
};

const getFollowers = async (req, res) => {
  const user = req.user.id;
  const followers = await db.getFollowers(user);
  console.log(followers);
  res.json(followers);
};

const getFollowing = async (req, res) => {
  const user = req.user.id;
  const following = await db.getFollowing(user);
  console.log(following);
  res.json(following);
};

export default {
  profile,
  index,
  createPost,
  getUserPosts,
  getOnePost,
  createComment,
  likePost,
  followUserRequest,
  acceptFollowerRequest,
  getFollowers,
  getFollowing,
};
