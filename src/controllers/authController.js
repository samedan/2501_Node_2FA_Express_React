import bcrypt from "bcryptjs";
import TwoFaUser from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
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
    res.status(500).json({ error: "Errore registering user", message: error });
  }
};
export const login = async () => {};
export const authStatus = async () => {};
export const logout = async () => {};
export const setup2FA = async () => {};
export const verify2FA = async () => {};
export const reset2FA = async () => {};
