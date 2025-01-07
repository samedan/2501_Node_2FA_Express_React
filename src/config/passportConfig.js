import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import TwoFaUser from "../models/user.js";

passport.use(
  // EMAIL: new LocalStrategy(async ({usernameField: "email"}, email, password, done) => {
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await TwoFaUser.findOne({ username });
      if (!user)
        return done(
          null, // error
          false, // userobject
          { message: "User not found" }
        );
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) return done(null, user);
      else return done(null, false, { message: "incorrect password" });
    } catch (error) {
      return done(error);
    }
  })
);

//SERIALIZE
passport.serializeUser((user, done) => {
  console.log("Serialize user");
  done(
    null, //error
    user._id
  );
});

//DESERIALIZE
passport.deserializeUser(async (_id, done) => {
  try {
    console.log("Deserialize user");
    const user = await TwoFaUser.findById(_id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
