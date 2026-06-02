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
  console.log(user);
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

export default {
  register,
  findUserId,
  findUsername,
  findGithubId,
  registerGithub,
};
