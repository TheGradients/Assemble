import React, { useState } from "react";
import HeaderPR from "./HeaderPR";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePass = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
   const [isForgotPassword, setIsForgotPassword] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = async () => {
    if (!password || !confirmPassword) {
      setError("Both fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.patch("/api/v1/users/forgotPassword", {
        email,
        password,
      });

      if (response.status === 200) {
        // Redirect to the home page or dashboard after successful password change
        navigate("/");
      } else {
        setError(response.data.message || "Failed to change password.");
      }
    } catch (err) {
      console.error("Error changing password:", err);
      setError("An error occurred. Please try again.");
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
            <div className="sign-in-box-heading">Change Password</div>
            <p className="head-text">
              Enter a new password. This time, try to remember and save it in a secure place.
            </p>
          </div>
          <div className="flex gap-5 flex-col">
            <input
              className="input-box"
              type="password"
              placeholder="NEW PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="input-box"
              type="password"
              placeholder="CONFIRM PASSWORD"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <div className="error-text text-red-500">{error}</div>}
            <button className="sign-in-button" onClick={handleClick}>
              ENTER
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

export default ChangePass;
