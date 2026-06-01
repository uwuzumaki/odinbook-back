import bcrypt from "bcryptjs";
import db from "../db/query.js";

const registration = async (req, res) => {
  const body = req.body;

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const user = await db.register(body.email, body.username, hashedPassword);
  console.log(user);
  res.json({ message: "works" });
};

export default registration;
