import passport from "passport";
import { Strategy } from "passport-github2";
import db from "../db/query.js";

passport.use(
  new Strategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await db.findGithubId(profile.id);
        if (user) done(null, user);
        user = await db.registerGithub(
          profile.username,
          profile.id,
          profile.photos[0].value,
        );
        return done(null, user);
      } catch (err) {
        console.log(err);
      }
    },
  ),
);
