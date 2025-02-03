import React, { useState } from "react";
import { HomeIcon } from "./ui/svg/HomeIcon";
import { GradientText } from "./ui/GradientElements/GradientText";
import UpperNav from "./ui/nav/UpperNav";
import { Sidebar } from "./ui/Sidebar/Sidebar";
import NavConsole from "./ui/nav/NavConsole";

const AccountCenter = () => {
  const [isPersonalInfoClicked, setIsPersonalInfoClicked] = useState(true);
  const [isEsportsInsight, setisEsportsInsight] = useState(false);
  const [selectedItem, setselectedItem] = useState("Name");
  const [otp, setOtp] = useState(Array(6).fill(""));
  // Handle click to toggle the Personal Information section
  const handlePersonalInfoClick = () => {
    setIsPersonalInfoClicked(true); // Show Personal Info
    setisEsportsInsight(false); // Hide Esports Insight
    setselectedItem(null);
  };

  const handleEsportsInsightClick = () => {
    setisEsportsInsight(true); // Show Esports Insight
    setIsPersonalInfoClicked(false); // Hide Personal Info
    setSelectedItem(null);
  };
  const handleItemClick = (item) => {
    setselectedItem(item);
  };
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value; // Update the OTP array
    setOtp(newOtp); // Set the updated OTP array in the state
  };
  const images = [
    "https://res.cloudinary.com/dzyezryhf/image/upload/v1737279929/lwtjedrq3ls0vy6jyymq.svg",
    "https://res.cloudinary.com/dzyezryhf/image/upload/v1737279951/q6eol9dwjadyvllkdfe0.svg",
    "https://res.cloudinary.com/dzyezryhf/image/upload/v1737279948/dgshgmbmoxjsyydnf8tu.svg",
    "https://res.cloudinary.com/dzyezryhf/image/upload/v1737279959/ux9mfgq1rsi62q0cmgb2.svg",
    "https://res.cloudinary.com/dzyezryhf/image/upload/v1737279927/jg8icrxi700co4s5itc1.svg",
  ];

  // State to track the selected image
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="ACMAIN relative h-screen">
        {/* Black Background Layer */}
        <div className="absolute inset-0 bg-black bg-opacity-35"></div>

        {/* Upper Navigation */}
        <UpperNav name="Account Center" />

        {/* Sidebar */}
        <Sidebar />

        {/* Frosted Glass Divs Container */}
        <div className="absolute inset-0 flex flex-wrap justify-center items-center mt-[100px] gap-8">
          {/* First Frosted Glass Div */}
          <div className="frosted-glass -mt-12 h-[97%] w-[20%] rounded-lg p-3">
            <div className="AC-head-text text-white">Account Center</div>
            <div className="AC-text text-white">
              Take a look at your Esports career and personal info, and enjoy
              the awesome vibe of tournaments with{" "}
              <span className="AC-span">assemble!</span>
            </div>
            <div
              className={`personal-info  pl-2 pt-1 pb-1 w-full  cursor-pointer ${
                isPersonalInfoClicked
                  ? "bg-white text-black"
                  : "bg-black text-white"
              }`}
              onClick={handlePersonalInfoClick}
            >
              Personal Information
            </div>
            <div
              className={`personal-info  pl-2 pt-1 pb-1 w-full  cursor-pointer ${
                isEsportsInsight ? "bg-white text-black" : "bg-black text-white"
              }`}
              onClick={handleEsportsInsightClick}
            >
              Esports Insight
            </div>
          </div>

          {/* Second Frosted Glass Div */}
          <div className="frosted-glass -mt-14 h-[97%] w-[20%] rounded-lg p-3">
            {/* Conditionally Render the Title and Description when Personal Info is clicked */}
            {isPersonalInfoClicked && (
              <>
                <div className="AC-head-text text-white">
                  Personal Information
                </div>
                <div className="AC-text text-white ">
                  Your personal information remains private to you and persons
                  you are allowing to show credentials to. Read our
                  <span className="AC-span"> privacy policy</span>
                </div>
                <div className="space-y-1  -mt-6">
                  {[
                    "",
                    "Name",
                    "Username",
                    "Date Of Birth",
                    "Email Id",
                    "Profile Picture",
                    "Password And Security",
                  ].map((option, index) => (
                    <div
                      key={index}
                      className={`per-info-options pl-2 pt-1 pb-1 w-full cursor-pointer ${
                        index === 0
                          ? "bg-black text-white" // First item always black background
                          : selectedItem === option
                          ? "bg-white text-black" // Selected item gets white background and black text
                          : "bg-black text-white" // Default black background and white text
                      }`}
                      onClick={() => handleItemClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </>
            )}

            {isEsportsInsight && (
              <>
                <div className="AC-head-text text-white">Esports Insight</div>
                <div className="AC-text text-white">
                  Your personal information remains private to you and persons
                  you are allowing to show credentials, read{" "}
                  <span className="AC-span">privacy policy</span>
                </div>
                <div className="space-y-1  -mt-6">
                  {[
                    "",
                    "Badge",
                    "BGMI",
                    "CODM",
                    "VALORANT",
                    "FREEFIRE",
                    "ASPHALT 9",
                  ].map((option, index) => (
                    <div
                      key={index}
                      className={`per-info-options pl-2 pt-1 pb-1 w-full cursor-pointer ${
                        index === 0
                          ? "bg-black text-white" // First item always black background
                          : selectedItem === option
                          ? "bg-white text-black" // Selected item gets white background and black text
                          : "bg-black text-white" // Default black background and white text
                      }`}
                      onClick={() => handleItemClick(option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Third and Fourth Frosted Glass Divs Container */}
          <div className="flex flex-col -mt-14 h-[97%] w-[40%] gap-4">
            {/* Third Frosted Glass Div */}
            <div
              className={`frosted-glass h-full flex-grow rounded-lg p-3 pl-24 pr-24 ${
                isPersonalInfoClicked ? "h-[50%]" : "h-full"
              }`}
            >
              {selectedItem && (
                <div className="text-white">
                  {/* Render Different Elements for Personal Information */}
                  {isPersonalInfoClicked && selectedItem === "Name" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text"> Name</div>
                        <div className="AC-text ">
                          Could you please provide your full name exactly as it
                          is listed on your official documents?
                        </div>
                      </div>
                      <div>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Name"
                        />
                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="AC-text">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isPersonalInfoClicked && selectedItem === "Username" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text"> Username</div>
                        <div className="AC-text ">
                          Creating a unique username which differentiate you
                          from another , build your own identity
                        </div>
                      </div>
                      <div>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />
                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="AC-text">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isPersonalInfoClicked &&
                    selectedItem === "Date Of Birth" && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <div className="AC-head-text"> Date</div>
                          <div className="AC-text ">
                            You can show off your gaming skills and no one will
                            judge you for your age!
                          </div>
                        </div>
                        <div>
                          <input
                            type="date"
                            className=" AC-input w-full p-2 text-black"
                            placeholder=""
                          />
                          <div className="flex mt-5 gap-2">
                            <button className="AC-buttons-cancel w-52 text-white">
                              Cancel
                            </button>
                            <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                              Save
                            </button>
                          </div>
                        </div>
                        <div className="AC-text">ASSEMBLE UID : 123456</div>
                      </div>
                    )}
                  {isPersonalInfoClicked && selectedItem === "Email Id" && (
                    <div className="flex flex-col gap-3">
                      <div>
                        <div className="AC-head-text"> Email</div>
                        <div className="AC-text ">
                          You can show off your gaming skills and no one will
                          judge you for your age!
                        </div>
                      </div>
                      <div>
                        <input
                          type="email"
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Email"
                        />
                        <div className="flex justify-between text-black">
                          {otp.map((digit, index) => (
                            <input
                              key={index}
                              id={`otp-${index}`}
                              className="input-otp mt-2 rounded-md"
                              placeholder="_"
                              maxLength="1"
                              value={digit}
                              onChange={(e) => handleOtpChange(e, index)}
                            />
                          ))}
                        </div>
                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                            Save
                          </button>
                        </div>
                      </div>
                      <div className="AC-text">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isPersonalInfoClicked &&
                    selectedItem === "Profile Picture" && (
                      <div className="flex flex-col gap-5">
                        <div>
                          <div className="AC-head-text"> Profile Picture</div>
                          <div className="AC-text ">
                            This will totally give you a unique vibe in esports!
                          </div>
                        </div>
                        <div>
                          <div className="AC-pp h-16 w-16 bg-white ml-44"></div>
                          <div className="flex mt-5 gap-2">
                            <button className="AC-buttons-cancel w-52 text-white">
                              Cancel
                            </button>
                            <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                              Save
                            </button>
                          </div>
                        </div>
                        <div className="AC-text">ASSEMBLE UID : 123456</div>
                      </div>
                    )}
                  {isPersonalInfoClicked &&
                    selectedItem === "Password And Security" && (
                      <div className="flex flex-col gap-1">
                        <div>
                          <div className="AC-head-text">
                            Password And Security
                          </div>
                          <div className="AC-text ">
                            Keep your account safe by creating a strong
                            password!
                          </div>
                        </div>
                        <div className="flex-col">
                          <input
                            type="text"
                            className=" AC-input w-full p-1 text-black mt-1 mb-1"
                            placeholder="Previous Password"
                          />
                          <input
                            type="text"
                            className=" AC-input w-full p-1 text-black mt-1 mb-1"
                            placeholder="New Password"
                          />
                          <input
                            type="text"
                            className=" AC-input w-full p-1 text-black mt-1 mb-1"
                            placeholder="Confirm New Password"
                          />
                        </div>
                        <div className="flex mt-3 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSgreen">
                            Save
                          </button>
                        </div>

                        <div className="AC-text mt-0">
                          ASSEMBLE UID : 123456
                        </div>
                      </div>
                    )}
                  {/* Render Different Elements for Esports Insight */}
                  {isEsportsInsight && selectedItem === "Badge" && (
                    <div>
                      <p>Your Esports badge details.</p>
                    </div>
                  )}
                  {isEsportsInsight && selectedItem === "BGMI" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text">
                          Battleground Mobile India
                        </div>
                        <div className="AC-text ">
                          Check out all the info about your BGMI account, plus
                          our series and tournaments right here!
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-center text-ASSgreen">
                          BGMI ID
                        </p>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />

                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSgreen ">
                            Save
                          </button>
                        </div>
                        <div className="AC-text-two text-3xl">Overview</div>
                      </div>
                      <div className="AC-text pt-80">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isEsportsInsight && selectedItem === "CODM" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text">Call Of Duty Mobile</div>
                        <div className="AC-text ">
                          Check out everything about your CODM account, series,
                          and tournaments in one spot!
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-center text-ASSblue">
                          CODM ID
                        </p>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />

                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSblue">
                            Save
                          </button>
                        </div>
                        <div className="AC-text-two text-3xl">Overview</div>
                      </div>
                      <div className="AC-text pt-80">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isEsportsInsight && selectedItem === "VALORANT" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text">Valorant</div>
                        <div className="AC-text ">
                          Check out all the info about your Valorant account,
                          plus our series and tournaments right here!
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-center text-white">
                          PLAYER ID
                        </p>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />

                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-white">
                            Save
                          </button>
                        </div>
                        <div className="AC-text-two text-3xl">Overview</div>
                      </div>
                      <div className="AC-text pt-80">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isEsportsInsight && selectedItem === "FREEFIRE" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text">Freefire</div>
                        <div className="AC-text ">
                          Check out all the info about your Valorant account,
                          plus our series and tournaments right here!
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-center text-ASSred">
                          PLAYER ID
                        </p>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />

                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSred">
                            Save
                          </button>
                        </div>
                        <div className="AC-text-two text-3xl">Overview</div>
                      </div>
                      <div className="AC-text pt-80">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {isEsportsInsight && selectedItem === "ASPHALT 9" && (
                    <div className="flex flex-col gap-5">
                      <div>
                        <div className="AC-head-text">ASPHALT 9</div>
                        <div className="AC-text ">
                          Check out all the info about your Valorant account,
                          plus our series and tournaments right here!
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-center text-ASSyellow">
                          PLAYER ID
                        </p>
                        <input
                          className=" AC-input w-full p-2 text-black"
                          placeholder="Username"
                        />

                        <div className="flex mt-5 gap-2">
                          <button className="AC-buttons-cancel w-52 text-white">
                            Cancel
                          </button>
                          <button className="AC-buttons-save w-52 text-black bg-ASSyellow">
                            Save
                          </button>
                        </div>
                        <div className="AC-text-two text-3xl">Overview</div>
                      </div>
                      <div className="AC-text pt-80">ASSEMBLE UID : 123456</div>
                    </div>
                  )}
                  {/* Add more for other selected items */}
                </div>
              )}
            </div>

            {/* Fourth Frosted Glass Div */}
            {!isEsportsInsight && (
              <div className="frosted-glass flex-col h-full text-white flex-grow rounded-lg p-3 pl-24 pr-24">
                <div>
                  <div className="AC-head-text">Esports Card Front </div>
                  <div className="AC-text ">
                    Make your personalized card for esports career
                  </div>
                </div>

                <div>
                  {/* AC-cards div with dynamic background */}
                  <div
                    className="AC-cards h-32 w-[90%] ml-[4%] text-black rounded-lg bg-cover bg-center"
 
                    style={{
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Optionally, you can add content inside AC-cards */}
                  </div>

                  {/* Choose-bg section with Tailwind CSS */}
                  <div className="choose-bg flex gap-4 w-full mt-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="Choose-bg-items h-14 w-20  rounded-lg cursor-pointer hover:opacity-75"
                        style={{
                          backgroundImage: `url(${image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                        onClick={() => handleImageSelect(image)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountCenter;
