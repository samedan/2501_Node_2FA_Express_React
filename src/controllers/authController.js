import bcrypt from "bcryptjs";
import TwoFaUser from "../models/user.js";

//REGISTER
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new TwoFaUser({
      username,
      password: hashedPassword,
      isMfaActive: false,
    });
    console.log("New User: ", newUser);
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (error) {
    res.status(500).json({ error: "Error registering user", message: error });
  }
};

//LOGIN
export const login = async (req, res) => {
  console.log("Authenticated user: ", req.user);
  res.status(200).json({
    message: "User logged in succesfully",
    username: req.user.username,
    isMfaActive: req.user.isMfaActive,
  });
};
export const authStatus = async () => {};
export const logout = async () => {};
export const setup2FA = async () => {};
export const verify2FA = async () => {};
export const reset2FA = async () => {};
