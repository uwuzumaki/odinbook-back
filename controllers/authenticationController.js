import passport from "passport";

const localAuthenticate = async (req, res) => {
  res.json({ user: req.user });
};

export default {
  localAuthenticate,
};
