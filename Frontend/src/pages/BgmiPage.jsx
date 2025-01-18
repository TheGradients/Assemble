import React from "react";
import UpperNav from "../components/ui/nav/UpperNav";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import {Hero} from "../components/bgmipage/Hero";

const BgmiPage = () => {
  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden relative no-scrollbar ">
      <div className="bg w-[100vw] h-[100vh] object-cover -z-10 bg-[#010101] no-scrollbar  fixed top-0 l-0">
        <img
          className="-translate-y-[17%] w-[100%] h-[165%] opacity-25 contrast-150 "
          src="../../public/svgviewer-png-output.png"
          alt="img"
        />
      </div>
      <div className="z-20">
        <UpperNav />
      </div>
      <div className="relative flex mt-2 h-[90%] w-[100%] justify-start no-scrollbar">
        <div className="relative h-[75%] w-[8%]">
          <Sidebar />
        </div>
        <div className="mt-2 h-[90%] w-[90%] no-scrollbar ">
          <Hero/>
        </div>
      </div>
    </div>
  );
};

export default BgmiPage;
