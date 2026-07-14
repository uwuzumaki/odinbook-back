import express from "express";
import passport from "passport";
import cors from "cors";

import router from "./routers/index.js";
import prismaSession from "./authentication/session.js";
import { isAuth } from "./authentication/protectRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(prismaSession);
app.use(passport.session());

app.use("/auth", router.authentication);
app.use("/register", router.registration);
// app.use("/user", isAuth, router.user) Enable once front end is done
app.use("/user", router.user);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
