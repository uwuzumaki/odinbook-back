import { Router } from "express";
import passport from "passport";

import "../authentication/localStrategy.js";
import "../authentication/githubStrategy.js";
import authenticationController from "../controllers/authenticationController.js";

const router = Router();

router.get("/verify", (req, res) => {
  if (req.isAuthenticated()) {
    const { password, ...newUser } = req.user;
    return res.json({ user: newUser });
  }
  res.status(401).json({ user: null });
});

router.post(
  "/local",
  passport.authenticate("local"),
  authenticationController.localAuthenticate,
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  authenticationController.githubAuthenticate,
);

router.get("/logout", authenticationController.logout);

export default router;
