import bcrypt from "bcryptjs";
import TwoFaUser from "../models/user.js";
import speakeasy from "speakeasy";
import qrCode from "qrcode";
import jwt from "jsonwebtoken";

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

// AUTH STATUS
export const authStatus = async (req, res) => {
  if (req.user) {
    // console.log(req.user);

    res.status(200).json({
      message: "User is still Logged in",
      username: req.user.username,
      isMfaActive: req.user.isMfaActive,
    });
  } else {
    res.status(401).json({ message: "Unauthorized User" });
  }
};

//LOGOUT
export const logout = async (req, res) => {
  // console.log(req.user);
  if (!req.user) res.status(401).json({ message: "Unauthorized User" });
  req.logout((err) => {
    if (err) return res.status(400).json({ message: "User Not logged in" });
    res.status(200).json({ message: "Logout successfully" });
  });
};

// 2FA Setup
export const setup2FA = async (req, res) => {
  try {
    console.log(req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret object is: ", secret);
    user.twoFactorSecret = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: `${req.user.username}`,
      issuer: "www.secretdan.com",
      encoding: "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url);
    res.status(200).json({
      secret: secret.base32,
      qrCode: qrImageUrl,
    });
  } catch (error) {
    res.status(500).json({ error: "Error setting 2FA", message: error });
  }
};

export const verify2FA = async () => {};
export const reset2FA = async () => {};
