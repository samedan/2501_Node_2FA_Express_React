import React from "react";
import { TwoFAVerification } from "../components/TwoFAVerification";
import { useNavigate } from "react-router-dom";

export const Verify2FA = () => {
  const navigate = useNavigate();

  const handleVerification = async (data) => {
    if (data) {
      navigate("/");
    }
  };

  const handle2FAReset = async (data) => {
    if (data) {
      navigate("/setup-2fa");
    }
  };

  // either HomePage or reset 2FA
  return (
    <TwoFAVerification
      onVerifySuccess={handleVerification}
      onResetSuccess={handle2FAReset}
    />
  );
};
