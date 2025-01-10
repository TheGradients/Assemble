import React, { useState } from "react";
import axios from "axios";
import HeaderPR from "./HeaderPR";
import { useNavigate } from "react-router-dom";

const PassRecovery = () => {
  const navigate = useNavigate();

  // State for input values and error handling
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleclick = async () => {
    try {
      const response = await axios.post(
        "/api/v1/users/forgotPasswordVerificationEmail",
        {
        email
        },
        {
          withCredentials: true,
        },
        navigate("/identity-verify",{ state: { email } }),
      );

      if (response.status === 200 && response.data.success) {
        console.log("API Response:", response.data);
        navigate("/browse");
        setEmail("");
        setPassword("");
      } else {
        setErrorMessage(
          response.data.message || "Invalid credentials. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="pr-page">
        <HeaderPR />
        <div className="pr-container">
          <div className="pr-top-box ">
            <button className="forgot-pass rounded-lg text-white">
              FORGOT PASSWORD
            </button>
            <button className="forgot-pass text-white rounded-lg">
              FORGOT USERNAME
            </button>
          </div>
          <div className="pr-bottom-box">
            <div className="container">
              <div className="sign-in-box-heading">PASSWORD RECOVERY</div>
              <p className="head-text">
                I know, You Remember About Your Partner's Birthday But A Small
                Password Not!
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
