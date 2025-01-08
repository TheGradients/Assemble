import React from "react";
import { HomeIcon } from "./ui/svg/HomeIcon";
import { GradientText } from "./ui/GradientElements/GradientText";
import UpperNav from "./ui/nav/UpperNav";

const AccountCenter = () => {
  return (
    <>
      <div className="ACMAIN relative">
     <div className="black bg-black h-screen w-full bg-opacity-80"></div>
        <UpperNav name="Account Center"/> 
        
        </div>
    </>
  );
};

export default AccountCenter;

