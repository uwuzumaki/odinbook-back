import { Router } from "express";
import passport from "passport";

import "../authentication/localStrategy.js";
import authenticationController from "../controllers/authenticationController.js";

const router = Router();

router.post(
  "/local",
  passport.authenticate("local"),
  authenticationController.localAuthenticate,
);

export default router;
