import React from 'react'
import HeaderPR from './HeaderPR';

function UsernameSent() {
  return (
    <>
      <div className="pr-page">
        <HeaderPR />
        <div className="pr-container">
          <div className="pr-top-box">
            <button className="forgot-pass text-white bg-black">FORGOT PASSWORD</button>
            <button className="forgot-pass text-black bg-white text-opacity-75">
              FORGOT USERNAME
            </button>
          </div>
          <div className="pr-bottom-box ">
            {/* SAME AS THE SIGN-IN BOX */}

            <div className="sign-in-box-heading ">Username Sent</div>
            <p className="head-text -mt-5">
              Your username is sent to your registered email id . hope you will
              excess it easily
            </p>

            {/* <div className="pass-image"></div> */}

            <button className="sign-in-button">Continue</button>
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
}

export default UsernameSent