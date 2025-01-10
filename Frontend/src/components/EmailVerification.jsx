import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const CreateAnewAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Store OTP values in an array

  // Debug: Log the location state
  // console.log("Location State:", location.state);

  const email = location.state?.email|| "No email provided"; // Fallback for email
  console.log("Email:", email);

  const handlePrivacyPolicyClick6 = () => {
    navigate("/GamerTag");
  };

  // Handle OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  // Collect OTP data on form submission
  const handleSubmit = async () => {
    console.log("OTP Submitted:", typeof otp.join("")); // Join OTP digits into a string
    console.log("Email:", typeof email);

    const otpValue = otp.join(""); // Join OTP digits into a string
    try {
      const response = await axios.post("/api/v1/users/verifyCode", {
        email,
        code:otpValue,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrivacyPolicyClickMinus5 = () => {
    navigate("/Register");
  };

  return (
    <>
      <div className="body">
        <div className="page">
          <Header />

          <div className="sign-in-box">
            <div className="container flex gap-2">
              <div className="flex flex-row gap-16">
                <div className="back" onClick={handlePrivacyPolicyClickMinus5}>
                  <IoArrowBackCircleOutline size={28} />
                </div>
                <div className="sign-in-box-heading">Email Verification</div>
              </div>
              <div className="head-text">
                Confirm your Identity To Showcase Your Gaming Skills In Esports
                World
              </div>
            </div>

            <div className="flex gap-5 flex-col">
              <div className="enter-otp">ENTER OTP</div>
              <div className="flex justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    className="input-otp"
                    placeholder="_"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1" // Ensure only one digit can be entered
                  />
                ))}
              </div>
              <button className="sign-in-button" onClick={handleSubmit}>
                CONTINUE
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <p className="end-text">Tournament Supported Games</p>
              <div className="logo flex justify-between">
                <div className="pubg"> </div>
                <div className="valorant"></div>
                <div className="coc"></div>
                <div className="cod"></div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
};

export default CreateAnewAccount;
