import { prisma } from "../lib/prisma.js";

const register = async (username, password) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  return user;
};

const findUserId = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

const findUsername = async (username) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  return user;
};

const findGithubId = async (githubId) => {
  const user = await prisma.user.findUnique({
    where: {
      githubId,
    },
  });
  return user;
};

const registerGithub = async (username, githubId, avatarUrl) => {
  const user = await prisma.user.create({
    data: {
      username,
      displayName: username,
      githubId,
      avatarUrl,
    },
  });
  return user;
};

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    omit: {
      password: true,
      githubId: true,
    },
    include: {
      posts: true,
    },
  });
  return user;
};

const createPost = async (userId, title, content) => {
  const post = await prisma.post.create({
    data: {
      postAuthorId: userId,
      title,
      content,
    },
    include: {
      postAuthor: {
        omit: {
          password: true,
          githubId: true,
        },
      },
    },
  });
  return post;
};

const getUserPosts = async (user) => {
  const posts = await prisma.post.findMany({
    where: {
      postAuthorId: user,
    },
    include: {
      like: true,
    },
  });
  return posts;
};

const getOnePost = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      postAuthor: {
        select: {
          username: true,
          displayName: true,
        },
      },
      comments: true,
      like: true,
    },
  });
  return post;
};

const createComment = async (userId, postId, content) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
  });
  return comment;
};

export default {
  register,
  findUserId,
  findUsername,
  findGithubId,
  registerGithub,
  getUser,
  createPost,
  getUserPosts,
  getOnePost,
  createComment,
};
