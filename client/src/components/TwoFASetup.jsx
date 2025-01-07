import React, { useEffect, useState } from "react";
import { setup2FA } from "../service/authApi";
// import { setup2FA } from "./../../../src/controllers/authController";

export const TwoFASetup = ({ onsetupComplete }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState({});

  const fetchQRCode = async () => {
    const { data } = await setup2FA();
    console.log(data);
    setResponse(data);
  };

  useEffect(() => {
    fetchQRCode();
  }, []);

  const copyClipboard = async () => {
    await navigator.clipboard.writetext(response.secret);
  };

  return (
    <div className="bg-white rounded-lg shadow-md w-full max-w-sm mx-auto">
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          Turn on 2FA Verification
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light px-5">
        Scan the QR Code below with your authenticator app.
      </p>
      <div className="p-6">
        <div className="flex justify-center">
          <img
            src={response.qrCode}
            alt="2FA QR Code"
            className="mb-4 border rounded-md"
          />
        </div>
        <div className="flex items-center mt-3 mb-3">
          <div className="border-t border-1 border-gray-200 flex-grow">
            <div className="text-gray-600 text-sm font-light pr-2 pl-2">
              QR enter the code mannualy
            </div>
          </div>
          <div className="border-t border-1 border-gray-200 flex-grow"></div>
        </div>
        <div className="mb-6">
          {message && <p className="text-green-600 text-sm mb-3">x</p>}
          <input
            readOnly
            defaultValue=""
            value={response.secret}
            className="w-full border rounded mt-2 text-xs text-gray-600 p-4"
            onClick={copyClipboard}
          />
        </div>
        <button
          onClick={onsetupComplete}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Continue to verification
        </button>
      </div>
    </div>
  );
};
