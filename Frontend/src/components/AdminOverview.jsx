import React from 'react'
import HeaderPR from './HeaderPR'

const AdminOverview = () => {
    const matches = [
        { name: "NIGHT HUNTER E6", date: "28 JAN 2025", time: "06:00 PM" },
        { name: "NIGHT HUNTER R7", date: "29 JAN 2025", time: "06:00 PM" },
        { name: "NIGHT HUNTER N8", date: "29 JAN 2025", time: "09:00 PM" },
        { name: "NIGHT HUNTER G9", date: "30 JAN 2025", time: "07:00 PM" },
      ]
  return (
    <div className="h-screen w-full bg-black relative">
        <HeaderPR />
        <div className="flex w-full h-full pt-4">
          {/* Sidebar */}
          <div className="space-y-5 ml-11 flex flex-col w-[15%] h-full">
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Overview</a>
            <a href="#" className="block text-[#0CFFA7] font-medium">
              Battleground<br />
              <span className="block">Mobile India</span>
            </a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Call Of Duty</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Valorant</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Freefire</a>
            <a href="#" className="block text-white hover:text-[#0CFFA7] transition-colors">Asphalt 9</a>
          </div>

          <main className="flex-1 p-6">
          {/* Series Header */}

          <div className="mb-6">
            <div className='flex items-center justify-between rounded-lg bg-[#FFFFFF0A] p-6'>
            <div>
                  <div className="text-xs font-medium text-[#D6DDE6]">MATCH NAME</div>
                  <div className="text-lg font-bold text-white">NIGHT HUNTER</div>
                </div>
          </div>
          </div>

          {/* Matches */}
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.name} className="flex items-center justify-between rounded-lg bg-zinc-900/70 p-6">
                <div>
                  <div className="text-xs font-medium text-green-400">MATCH NAME</div>
                  <div className="text-lg font-bold text-white">{match.name}</div>
                </div>

                <div>
                  <div className="text-xs font-medium text-green-400">MATCH DATE</div>
                  <div className="text-lg font-bold text-white">{match.date}</div>
                </div>

                <div>
                  <div className="text-xs font-medium text-green-400">MATCH TIME</div>
                  <div className="text-lg font-bold text-white">{match.time}</div>
                </div>

                <button className="rounded-lg  p-2 text-white hover:bg-zinc-700">
                 <img src="plus.png" alt="" />
                </button>
              </div>
            ))}
          </div>
        </main>

          </div>


          
          </div>
  )
}

export default AdminOverview
