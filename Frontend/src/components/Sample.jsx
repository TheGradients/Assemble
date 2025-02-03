import React, { useState } from "react";
import axios from "axios";
import HeaderPR from "./HeaderPR";
import { useNavigate } from "react-router-dom";

const Sample = () => {
   
  return (
    <>
      <div className="pr-page">
        <HeaderPR />
        <div className="pr-container">
          <div className="pr-top-box ">
            <button className="forgot-pass rounded-lg text-white">
              FORGOT PASSWORD
            </button>
            <button className="forgot-pass text-white rounded-lg " >
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
                
              />
              <button className="sign-in-button" >
                CONTINUE
              </button>
              
                <p className="error-message text-red-500">{errorMessage}</p>
        
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

export default Sample;
