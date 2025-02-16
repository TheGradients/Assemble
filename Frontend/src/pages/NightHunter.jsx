import React, { useState } from "react";
import UpperNav from "../components/ui/nav/UpperNav";
import { Sidebar } from "../components/ui/Sidebar/Sidebar";
import { Hero } from "../components/bgmipage/Hero";
import { GradientText } from "../components/ui/GradientElements/GradientText";
import { EventCard } from "../components/ui/GameCards/EventCard";

const NightHunter = () => {
  const [item, selectedItem] = useState("OVERVIEW");

  const handleItemClick = (item) => {
    selectedItem(item);
  };
  console.log(item);
  return (
    <div className="h-[100vh] w-[100vw] overflow-hidden relative no-scrollbar ">
      <div className="bg-NH w-[100vw] h-[100vh] object-cover -z-10   no-scrollbar fixed top-0 l-0"></div>
      <div className="z-20">
        <UpperNav name="Night Hunter" />
      </div>
      <div className="relative flex mt-2 h-[90%] w-[100%] justify-start no-scrollbar">
        <div className="relative h-[75%] w-[8%]">
          <Sidebar />
        </div>
        <div className="  justify-between w-[88%] mt-2 h-[90%]">
          {/* GradientText and EventCard */}
          <div className="flex flex-col flex-grow">
            <div className="w-[20%] h-[12%] gap-4 bg-[#0000009f] flex items-center justify-center rounded-xl">
              <div className="w-auto">
                <h1 className="text-[#87c5af] font opacity-100 font-bold w-[100%] text-[4.5rem]">
                  01
                </h1>
              </div>
              <div className="w-[60%] opacity-100">
                <GradientText size="3xl" text="battleground " />
                <br />
                <GradientText size="3xl" text="mobile india" />
              </div>
            </div>
            <div className="mt-2 w-full">
              <EventCard
                initialColor={"#00AF60"}
                viaColor={"#B1E9D5"}
                finalColor={"#00FFA3"}
                name={
                  <>
                    night <br /> hunter - r7
                  </>
                }
                mode={"solo"}
                slots={"60/100"}
                date="06 oct"
                time="7:00 PM"
                pool="1650INR"
                fee="29inr"
              />
            </div>
          </div>

          {/* Frosted Glass Div with fixed height */}
          <div className="frosted-glass-NH -mt-6 h-[70%] text-[#FFFFFF]  rounded-md flex p-3 justify-between">
            <div className="h-full w-[25%] rounded-md  bg-emerald-600 ">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://res.cloudinary.com/dzyezryhf/image/upload/v1737660278/Image_1_oqvch7.svg')`,
                }}
              >
                {/* Your content goes here */}
              </div>
            </div>
            {/* src="https://res.cloudinary.com/dzyezryhf/image/upload/v1737660278/Image_1_oqvch7.svg" */}
            <div className="h-full w-[16%] rounded-md text-left pl-4">
              <div className="NH-heading text-4xl mb-10 text-ASSgreen">
                MENU SECTION
              </div>
              <div className="space-y-1  -mt-6">
                {[
                  "OVERVIEW",
                  "PRIZEPOOL",
                  "GAME DETAILS",
                  "SCHEDULE",
                  "PLAYERS",
                  "LEADERBOARD",
                  "ID AND PASS",
                  "REFUND FORM",
                ].map((option, index) => (
                  <div
                    key={index}
                    className={`NH-options pt-1  w-full cursor-pointer 
                        ${
                          item === option
                            ? "text-[#FFFFFF]" // Dark white color when selected
                            : "text-[#FFFFFF] text-opacity-50" // 50% opacity for unselected
                        }
                   `}
                    onClick={() => handleItemClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className="h-full w-[55%] rounded-md border-x-8 border-ASSgreen pl-8 pr-8 snap-y overflow-auto no-scrollbar">
              {item === "OVERVIEW" && (
                <div>
                  <div className="NH-option-heading mb-4 text-ASSgreen text-4xl text-center  ">
                    OVERVIEW
                  </div>
                  <div className="NH-option-heading text-white text-3xl text-center  ">
                    NIGHT HUNTER R7
                  </div>
                  <div className="NH-heading text-white text-opacity-50 text-3xl text-center mb-6">
                    Join our daily BGMI gaming series from 5:30 PM to midnight!
                    Show off your skills, have some fun, and even earn some cash
                    while you’re at it. Discover what you’re good at, level up,
                    and dive into the esports scene!
                  </div>
                  <div className="NH-option-heading text-white text-3xl text-center  ">
                    instructions
                  </div>
                  <div className="NH-heading text-white text-opacity-50 text-3xl text-center mb-3 tracking-wide">
                    <span className="mr-2">1. </span>To join this series, just
                    pick a time that works for you and make sure to pay before
                    the deadline!
                    <br />
                    <br />
                    <span className="mr-2">2. </span>You'll get your ID and
                    password about 20 minutes before the match, so just stay
                    ready and keep an eye out!
                    <br />
                    <br />
                    <span className="mr-2">3. </span>The game will keep going if
                    there are more than 40 players. If there are fewer than 40,
                    you'll automatically get a refund.
                    <br />
                    <br />
                    <span className="mr-2">4. </span>All the info you need is
                    right here! If you’ve got any questions, just hit up our
                    support team.
                    <br />
                    <br />
                    <span className="mr-2">5. </span>You’ll see your prize in
                    your wallet! Just hang tight for 24 hours to see your earnin
                    p up in your account.
                    <br />
                  </div>
                </div>
              )}
              {item === "PRIZEPOOL" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    PRIZEPOOL
                  </div>
                </div>
              )}
              {item === "GAME DETAILS" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    GAME DETAILS
                  </div>
                </div>
              )}
              {item === "SCHEDULE" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    SCHEDULE
                  </div>
                </div>
              )}
              {item === "PLAYERS" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    PLAYERS
                  </div>
                </div>
              )}
              {item === "LEADERBOARD" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    LEADERBOARD
                  </div>
                </div>
              )}
              {item === "ID AND PASS" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    ID AND PASS
                  </div>
                </div>
              )}
              {item === "REFUND FORM" && (
                <div>
                  <div className="NH-option-heading mb-3 text-ASSgreen text-4xl text-center  ">
                    {" "}
                    REFUND FORM
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NightHunter;
