export const isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(403).json({ message: "Invalid permissions" });
  }
};
