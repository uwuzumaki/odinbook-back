import { faker } from "@faker-js/faker";
import db from "./db/query.js";

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

(async () => {
  const fakerRounds = 10;
  console.log("Seeding");
  for (let i = 0; i < fakerRounds; i++) {
    const user = fakerUser();
    const createdUser = await db.register(user.username, user.password);
    console.log(createdUser);
  }
})();
