import passport from "passport";

const localAuthenticate = async (req, res) => {
  res.json({ user: req.user });
};

const githubAuthenticate = async (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("/");
};

export default {
  localAuthenticate,
  githubAuthenticate,
};
