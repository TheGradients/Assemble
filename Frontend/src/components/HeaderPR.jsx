import React from "react";
import { TiArrowBack } from "react-icons/ti";

const HeaderPR = () => {
  return (
    <>
      <div className="body">
        <div className="navbar-div flex justify-between pr-6">
          <div className="navbar">
            <div className="assemble">ASSEMBLE</div>
            <div className="GUI">GAMEZONE UNITED INDIA</div>
          </div>
            <button className="back-button text-white text-2xl" onClick={() => window.history.back()}>
            <TiArrowBack size={50}/>
            </button>

        </div>
      </div>
    </>
  );
};

export default HeaderPR;
