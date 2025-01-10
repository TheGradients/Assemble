 import React from "react";
import { HomeIcon } from "./ui/svg/HomeIcon";
import { GradientText } from "./ui/GradientElements/GradientText";
import UpperNav from "./ui/nav/UpperNav";
import { Sidebar } from "./ui/Sidebar/Sidebar";

const AccountCenter = () => {
  return (
    <>
      <div className="ACMAIN relative h-screen ">
        {/* Bl  ack Background Layer */}
        <div className="absolute inset-0  bg-black bg-opacity-35"></div>

        {/* Upper Navigation */}
        <UpperNav name="Account Center" />
        
        {/* Sidebar */}
        <Sidebar />

        {/* Frosted Glass Divs Container */}
        <div className="absolute inset-0 flex flex-wraph  justify-center items-center mt-[100px] gap-8">
          {/* First Frosted Glass Div */}
          <div className="frosted-glass -mt-14 h-[97%] w-[20%]  rounded-lg">
            
          </div>

          {/* Second Frosted Glass Div */}
          <div className="frosted-glass -mt-14 h-[97%] w-[20%]  rounded-lg">
         
          </div>

          {/* Third and Fourth Frosted Glass Divs Container */}
          <div className="flex flex-col -mt-14 h-[97%] w-[40%]  gap-4">
            {/* Third Frosted Glass Div */}
            <div className="frosted-glass h-[50%] flex-grow rounded-lg"></div>

            {/* Fourth Frosted Glass Div */}
            <div className="frosted-glass flex-grow h-[50%] rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCenter;
