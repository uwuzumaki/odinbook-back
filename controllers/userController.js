import db from "../db/query.js";

const home = async (req, res) => {
  const user = await db.getUser(req.user.id);
  res.json(user);
};

export default { home };
