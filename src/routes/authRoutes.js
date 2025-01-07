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

// Registration @/api/auth/register
router.post("/register", register);

// Login @/api/auth/login
router.post("/login", passport.authenticate("local"), login);

// Auth Status @/api/auth/status
router.get("/status", authStatus);

// Logout
router.post("/logout", logout);

// MFA Setup
router.post("/2fa/setup", setup2FA);
// verify 2fa
router.post("/2fa/verify", verify2FA);
// reset
router.post("/2fa/reset", reset2FA);

export default router;
