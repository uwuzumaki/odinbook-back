import passport from "passport";

const localAuthenticate = (req, res) => {
  res.json({ user: req.user });
};

const githubAuthenticate = (req, res) => {
  // Successful authentication, redirect home.
  res.redirect("http://localhost:5173");
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out" });
    });
  });
};

export default {
  localAuthenticate,
  githubAuthenticate,
  logout,
};
