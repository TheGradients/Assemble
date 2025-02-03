import React, { useState } from "react";


import { Navigate, useNavigate } from "react-router-dom";
const UsernameRecovery = () => {
  const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate("/UsernameOTP");
  // }
 
  

  return (
    <>
      <div className="pr-page">
        <HeaderPR />
        <div className="pr-container">
          <div className="pr-top-box">
            <button className="forgot-pass text-white">FORGOT PASSWORD</button>
            <button className="forgot-pass text-white  text-opacity-75">
              FORGOT USERNAME
            </button>
          </div>
          <div className="pr-bottom-box">
            {/* SAME AS THE SIGN-IN BOX */}
            <div className="container ">
              <div className="sign-in-box-heading ">PASSWORD RECOVERY</div>
              <p className="head-text">
                I know, You Can Remember Clingy Words Given By Your Partner But
                Gamertag Not!
              </p>
            </div>
            <div className="flex gap-5 flex-col">
              <input
                className="input-box"
                placeholder="EMAIL ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="sign-in-button" onClick={handleClick} onClick={handleclick}>
                VERIFY
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

export default UsernameRecovery;