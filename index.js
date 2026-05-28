import express from "express";
import bcrypt from "bcryptjs";
import db from "./db/query.js";

import passport from "passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/register", async (req, res) => {
  const body = req.body;

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await db.register(body.email, body.username, hashedPassword);
  console.log(user);
  res.json({ message: "works" });
});

app.post("/login", async (req, res) => {});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
