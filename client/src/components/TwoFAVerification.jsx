import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { reset2FA, verify2FA } from "../service/authApi";

export const TwoFAVerification = ({ onVerifySuccess, onResetSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleTokenVerification = async (e) => {
    e.preventDefault();
    try {
      const { data } = await verify2FA(otp);
      onVerifySuccess(data);
    } catch (error) {
      setOtp("");
      console.log("The error is: ", error.message);
      setError("Invalid OTP");
    }
  };

  const handleReset = async () => {
    try {
      const { data } = await reset2FA();
      onResetSuccess(data);
    } catch (error) {
      console.log("The error is: ", error.message);
      setError("Invalid OTP");
    }
  };

  return (
    <form
      onSubmit={handleTokenVerification}
      className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">Validate TOTP</h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">
        Please enter 6-digit Time OTP to verufy 2FA Authentification
      </p>
      <div className="p-6">
        {/* Username */}
        <div className="mb-4">
          <label className="text-gray-600 text-sm">TOTP</label>
          <input
            label="TOTP"
            value={otp}
            type="text"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="w-full p-2 border rounded mt-3"
            placeholder="Enter your TOTP"
            required
          />
        </div>

        {/* erorr & message */}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-3"
        >
          Verify TOTP
        </button>
        <button
          type="submit"
          className="w-full bg-slate-500 text-white py-2 rounded-md"
          onClick={handleReset}
        >
          Reset 2FA
        </button>
      </div>
    </form>
  );
};
