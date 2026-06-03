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

const getFeed = async (id) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const feedPosts = await prisma.post.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
      OR: [
        { postAuthorId: id },
        {
          postAuthor: {
            followedBy: {
              some: {
                followingId: id,
              },
            },
          },
        },
      ],
    },
    include: {
      postAuthor: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
      like: true,
    },
    orderBy: { createdAt: "desc" },
  });
  return feedPosts;
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

const likePost = async (userId, postId) => {
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });
  return like;
};

const followUserRequest = async (targetAccount, followerAccount) => {
  const followRequest = await prisma.follows.create({
    data: {
      followingId: targetAccount,
      followerId: followerAccount,
      status: "PENDING",
    },
  });
  return followRequest;
};

const acceptFollowerRequest = async (userAccount, followerAccount) => {
  console.log(userAccount, followerAccount);
  const acceptRequest = await prisma.follows.update({
    where: {
      followingId_followerId: {
        followingId: userAccount,
        followerId: followerAccount,
      },
    },
    data: {
      status: "ACCEPTED",
    },
  });
  return acceptRequest;
};

const getFollowers = async (userId) => {
  const followers = await prisma.follows.findMany({
    where: {
      status: "ACCEPTED",
      followingId: userId,
    },
    include: {
      following: {
        select: {
          id: true,
          username: true,
          displayName: true,
          avatarUrl: true,
        },
      },
    },
    omit: {
      followerId: true,
      followingId: true,
    },
  });
  return followers;
};

export default {
  register,
  findUserId,
  findUsername,
  findGithubId,
  registerGithub,
  getUser,
  getFeed,
  createPost,
  getUserPosts,
  getOnePost,
  createComment,
  likePost,
  followUserRequest,
  acceptFollowerRequest,
  getFollowers,
};
