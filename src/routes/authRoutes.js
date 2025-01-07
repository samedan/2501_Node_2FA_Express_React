import { Router } from "express";
import passport from "passport";
import {
  register,
  login,
  authStatus,
  logout,
  setup2FA,
  verify2FA,
  reset2FA,
} from "../controllers/authController.js";

const router = Router();

// Middleware
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: "Unauthorized" });
};

// Registration POST @/api/auth/register
router.post("/register", register);

// Login POST @/api/auth/login
router.post("/login", passport.authenticate("local"), login);

// Auth Status GET @/api/auth/status
router.get("/status", authStatus);

// Logout POST @/api/auth/logout
router.post("/logout", logout);

// 2FA Setup POST @/api/auth/2fa/setup
router.post("/2fa/setup", isLoggedIn, setup2FA);
// 2FA Verify
router.post("/2fa/verify", isLoggedIn, verify2FA);
// 2FA Reset
router.post("/2fa/reset", isLoggedIn, reset2FA);

export default router;
