import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";

const GamerTag = () => {
  const [username, setUsername] = useState(""); // State for username
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handlePrivacyPolicyClick7 = () => {
    if (!username.trim()) {
      alert("Please enter a valid username.");
      return;
    }
    navigate("/Password", { state: { username, email } }); // Pass both username and email to the next page
  };

  const handlePrivacyPolicyClickMinus6 = () => {
    navigate("/EmailVerification");
  };

  return (
    <>
      <div className="body">
        <div className="page">
          <Header />

          <div className="sign-in-box">
            <div className="container flex gap-2">
              <div className="flex flex-row gap-20">
                <div className="back" onClick={handlePrivacyPolicyClickMinus6}>
                  <IoArrowBackCircleOutline size={28} />
                </div>
                <div className="sign-in-box-heading">Gamer tag</div>
              </div>
              <div className="head-text">
                Creating a unique username differentiates you from others, build your own identity.
              </div>
            </div>

            <div className="flex gap-5 flex-col">
              <input
                className="input-box"
                placeholder="USERNAME"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state
              />

              <button
                className="sign-in-button"
                onClick={handlePrivacyPolicyClick7}
              >
                ENTER
              </button>
            </div>

            <div className="flex flex-col gap-5">
              <p className="end-text">Tournament Supported Games</p>
              <div className="logo flex justify-between">
                <div className="pubg"></div>
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

export default GamerTag;