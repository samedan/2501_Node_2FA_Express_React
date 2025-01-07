import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import TwoFaUser from "../models/user.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await TwoFaUser.findOne({ username });
      if (!user)
        return done(
          null, // error
          false, // userobject
          { message: "User not found" }
        );
      const isMatch = bcrypt.compare(passport, user.password);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (error) {
      return done(error);
    }
    TwoFaUser.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user._id);
});
