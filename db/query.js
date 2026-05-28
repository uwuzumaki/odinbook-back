import { prisma } from "../lib/prisma.js";

const register = async (email, username, password) => {
  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });
  return user;
};

export default { register };
