import React, { useState } from "react";
import axios from "axios";
import HeaderPR from "./HeaderPR";
import { useNavigate } from "react-router-dom";

const PassRecovery = () => {
  const navigate = useNavigate();

  // State for input values and error handling
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // State to toggle between modes
  const [isForgotPassword, setIsForgotPassword] = useState(true);

  const handleclick = async () => {
    try {
      const endpoint = isForgotPassword
        ? "/api/v1/users/forgotPasswordVerificationEmail"
        : "/api/v1/users/forgetUsernameVerificationEmail";
    // console.log(`${endpoint}`);
    // console.log(email);
    // console.log(isForgotPassword);
    
    const response = await axios.post(
      endpoint,
         {email})
      console.log(response);
    //  toast.success(response.data.message);
      if (response.status === 200 && response.data.success) {
        console.log("API Response:", response.data);
        navigate("/identity-verify", { state: { email ,isForgotPassword} });
        setEmail("");
      } else {
        setErrorMessage(
          response.data.message || "Invalid credentials. Please try again."
        );
      }
      navigate("/identity-verify", { state: { email ,isForgotPassword} });
    } catch (error) {
      console.error("Error during API call:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  

  };
  // const handleclickUsername = () => {
  //   // navigate("/UsernameRecovery");
  // }
  return (
    <>
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
              <div className="sign-in-box-heading">
                {isForgotPassword ? "PASSWORD RECOVERY" : "USERNAME RECOVERY"}
              </div>
              <p className="head-text">
                {isForgotPassword
                  ? "I know, You Remember About Your Partner's Birthday But A Small Password Not!"
                  : "Forgot your username? Don't worry, we’ll help you recover it!"}
              </p>
            </div>
            <div className="flex gap-5 flex-col">
              <input
                className="input-box"
                placeholder="EMAIL ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="sign-in-button" onClick={handleclick}>
                CONTINUE
              </button>
              {errorMessage && (
                <p className="error-message text-red-500">{errorMessage}</p>
              )}
            </div>
            <div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PassRecovery;
