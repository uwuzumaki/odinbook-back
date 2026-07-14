import { faker } from "@faker-js/faker";
import db from "./db/query.js";
import { prisma } from "./lib/prisma.js";

const capitalize = (word) => {
  const cap = word.charAt(0).toUpperCase() + word.slice(1);
  return cap;
};

const fakerUser = () => {
  const username =
    capitalize(faker.word.adjective()) +
    capitalize(faker.word.adjective()) +
    capitalize(faker.word.noun());

  const password = "password";

  const user = {
    username,
    password,
  };
  return user;
};

const fakerPost = (user) => {
  const post = {
    userId: user[0].id,
    content: faker.lorem.sentences({ min: 1, max: 3 }),
    title: faker.lorem.sentence(),
  };
  return post;
};

// (async () => {
//   const fakerRounds = 10;
//   console.log("Seeding Users");
//   for (let i = 0; i < fakerRounds; i++) {
//     const user = fakerUser();
//     const createdUser = await db.register(user.username, user.password);
//     console.log(createdUser);
//   }
//   console.log("Done");
//   console.log("Seeding Posts");
//   const userCount = await prisma.user.count();

//   for (let i = 0; i < 30; i++) {
//     const skip = Math.floor(Math.random() * userCount);
//     const user = await prisma.user.findMany({
//       take: 1,
//       skip,
//     });
//     const post = fakerPost(user);
//     const createPost = await db.createPost(
//       post.userId,
//       post.title,
//       post.content,
//     );
//   }
//   console.log("Done");
// })();

(async () => {
  console.log("Seeding main user posts");
  const user = [
    {
      id: "1a5559a4-c28e-4191-b8a6-e0589346bc78",
    },
  ];
  for (let i = 0; i < 10; i++) {
    const post = fakerPost(user);
    const createPost = await db.createPost(
      post.userId,
      post.title,
      post.content,
    );
  }
  console.log("done");
})();
