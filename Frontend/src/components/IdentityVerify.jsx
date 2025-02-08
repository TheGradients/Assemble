import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderPR from "./HeaderPR";

const IdentityVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const email = location.state?.email || "";
  const [isForgotPassword, setIsForgotPassword] = useState(
    location.state?.isForgotPassword || true
  );

  useEffect(() => {
    // Set initial mode based on the state passed from navigation
    if (location.state?.isForgotPassword !== undefined) {
      setIsForgotPassword(location.state.isForgotPassword);
    }
  }, [location.state]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Automatically move focus to the next input
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    if (!otpValue || otpValue.length < 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const endpoint = isForgotPassword
        ? "/api/v1/users/forgotPasswordVerificationCode"
        : "/api/v1/users/forgotUsernameVerificationCode";

      const response = await axios.post(endpoint, {
        email,
        code: otpValue,
      });

      if (response.status === 200) {
        setError(""); // Clear error if successful
        isForgotPassword
          ? navigate("/ChangePass", { state: { email } })
          :  navigate("/UsernameSent", { state: { email } });
      } else {
        setError(response.data.message || "Failed to verify OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="pr-page">
      <HeaderPR />
      <div className="pr-container">
        <div className="pr-top-box">
          <button
            className={`forgot-pass rounded-lg ${
              isForgotPassword ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setIsForgotPassword(true)}
          >
            FORGOT PASSWORD
          </button>
          <button
            className={`forgot-pass rounded-lg ${
              !isForgotPassword ? "bg-white text-black" : "bg-black text-white"
            }`}
            onClick={() => setIsForgotPassword(false)}
          >
            FORGOT USERNAME
          </button>
        </div>
        <div className="pr-bottom-box">
          <div className="container">
            <div className="sign-in-box-heading">Identity Verification</div>
            <p className="head-text">
              We have sent an OTP to your registered email ID. Please enter it below.
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <div className="enter-otp">ENTER OTP</div>
            <div className="flex justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  className="input-otp"
                  placeholder="_"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  maxLength="1"
                />
              ))}
            </div>
            {error && <div className="error-text">{error}</div>}
            <button className="sign-in-button" onClick={handleSubmit}>
              CONTINUE
            </button>
          </div>
          <div className="line-container">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="line"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityVerify;
