import React from 'react';
import Header from './Header';
import HeaderPR from './HeaderPR';

const Admin = () => {
  return (
    <>
      <div className="h-screen w-full bg-black relative">
        <HeaderPR />
        <div className="flex w-full h-full pt-4">
          {/* Sidebar */}
          <div className="space-y-5 ml-11 flex flex-col w-[15%] h-full">
            <a href="#" className="block text-[#0CFFA7] font-medium">Overview</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">
              Battleground<br />
              <span className="block">Mobile India</span>
            </a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Call Of Duty</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Valorant</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Freefire</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Asphalt 9</a>
          </div>

          {/* Main Content */}
          <div className="h-full w-[80%] flex-col justify-between">
            {/* Welcome Section */}
            <div className="h-[25%]">
              <div className="font-bold text-5xl text-ASSgreen">WELCOME,</div>
              <div className="font-bold text-6xl text-white">ADMIN NV02</div>
            </div>

            {/* Key Metrics Section */}
            <div className="h-[25%] text-[#D6DDE6] text-2xl">
              Key Metrics
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 mt-4">
                {/* Total Users */}
                <div className="rounded-2xl bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-zinc-200">Total Users</h3>
                    <button className="text-zinc-400 hover:text-zinc-300">
                      <span className="text-2xl">...</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-semibold text-white">1296</p>
                    <span className="ml-2 text-sm text-green-400">+12%</span>
                  </div>
                </div>

                {/* Users Online */}
                <div className="rounded-2xl bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-zinc-200">Users Online</h3>
                    <button className="text-zinc-400 hover:text-zinc-300">
                      <span className="text-2xl">...</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-semibold text-white">782</p>
                    <span className="ml-2 text-sm text-green-400">+2%</span>
                  </div>
                </div>

                {/* New Registrations */}
                <div className="rounded-2xl bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-zinc-200">New Registrations</h3>
                    <button className="text-zinc-400 hover:text-zinc-300">
                      <span className="text-2xl">...</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-semibold text-white">567</p>
                    <span className="ml-2 text-sm text-green-400">+5%</span>
                  </div>
                </div>

                {/* Total Revenue */}
                <div className="rounded-2xl bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-zinc-200">Total Revenue</h3>
                    <button className="text-zinc-400 hover:text-zinc-300">
                      <span className="text-2xl">...</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-semibold text-white">25000</p>
                    <span className="ml-2 text-sm text-green-400">+8%</span>
                  </div>
                </div>

                {/* Total Profit */}
                <div className="rounded-2xl bg-zinc-900 p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-medium text-zinc-200">Total Profit</h3>
                    <button className="text-zinc-400 hover:text-zinc-300">
                      <span className="text-2xl">...</span>
                    </button>
                  </div>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-4xl font-semibold text-white">5000</p>
                    <span className="ml-2 text-sm text-red-400">-10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex h-[35%] w-full overflow-hidden">
              <img src="Container.png" alt="" className="h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;



