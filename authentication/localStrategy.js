import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { DbNull } from "@prisma/client/runtime/client";

passport.use(
  new Strategy(async (email, password, done) => {
    try {
      // const user = await

      if (!user) {
        return done(null, false, {
          message: "There's no user with these credentials!",
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return (
          done,
          false,
          {
            message: "There's no user with these credentials!",
          }
        );
      }
      const newUser = {
        id: user.id,
        email: user.email,
        username: user.username,
      };
      return done(null, newUser);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // const user=await
    done(null, user);
  } catch (err) {
    done(err);
  }
});
