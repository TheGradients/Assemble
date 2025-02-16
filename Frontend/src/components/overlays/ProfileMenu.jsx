import React from "react";

const ProfileMenu = () => {
  return (
    <div className="profileMenu w-56 h-96 bg-black p-4 pb-4 rounded-2xl relative">
      {/* Profile Photo Section */}
      <div className="profilePhoto h-[30%] w-full rounded-lg overflow-hidden bg-white"></div>

      {/* Username */}
      <div className=" border-ASSgreen p-3">
        <h1 className="text-center text-2xl text-ASSgreen font-bold mt-2">
          GHOSTRIDER69
        </h1>

        {/* User Details */}
        <div className="text-center text-white mt-3">
          <div className="mb-2">
            <p className="text-sm uppercase text-gray-400">Name</p>
            <p className="text-lg font-bold">VIVEK SHUKLA</p>
          </div>

          <div className="mb-2">
            <p className="text-sm uppercase text-gray-400">Age</p>
            <p className="text-lg font-bold">18 Years</p>
          </div>

          <div>
            <p className="text-sm uppercase text-gray-400">Badge</p>
            <p className="text-lg font-bold text-green-400">
              Choose Your Badge
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button className="absolute   left-1/2 transform -translate-x-1/2 text-red-500 flex items-center gap-1 font-bold mt-1">
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
