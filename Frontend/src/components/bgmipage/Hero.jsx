import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { EventCard } from "../ui/GameCards/EventCard";
import { GradientText } from "../ui/GradientElements/GradientText";

export const Hero = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Fetch data from API
  // useEffect(() => {
  //   fetch("YOUR_API_ENDPOINT_HERE")
  //     .then((res) => res.json())
  //     .then((data) => setEvents(data))
  //     .catch((error) => console.error("Error fetching events:", error));
  // }, []);

  return (
    <div className="no-scrollbar font-bebas flex flex-col gap-2 h-[100%] w-[100%]">
      <div className="w-[20%] h-[17%] gap-4 bg-[#0000009f] flex items-center justify-center p-4 rounded-xl">
        <div className="w-auto">
          <h1 className="text-[#87c5af] font-bold text-[4.5rem]">01</h1>
        </div>
        <div className="w-[60%]">
          <GradientText size="3xl" text="battleground" />
          <br />
          <GradientText size="3xl" text="mobile india" />
        </div>
      </div>

      <div className="flex h-[85%] gap-4 w-[100%]">
        {/* Upcoming and Ongoing Series */}
        <div className="w-[20%] h-[70vh] gap-2 bg-[#0000009f] rounded-xl flex flex-col items-center px-4 py-2">
          <div className="brightness-125">
            <GradientText size="lg" text="upcoming and ongoing series" />
          </div>
          {/* Hardcoded Events */}
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col h-[30%] items-center cursor-pointer">
              <div className="w-[100%] h-[100%] overflow-hidden rounded-lg">
                <img className="-translate-y-10" src="../../../public/svgviewer-png-output.png" alt="" />
              </div>
              <h1 className="text-3xl text-white font-semibold tracking-widest -mt-8">Night Hunter</h1>
              <h3 className="text-xs text-center text-white tracking-wide">
                We go live every day from 6 PM to noon!
              </h3>
            </div>
          ))}
        </div>

        {/* Event List */}
        <div className="w-[80%] h-[100%] overflow-y-scroll no-scrollbar rounded-xl">
          {events.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                initialColor={event.initialColor || "#00AF60"}
                viaColor={event.viaColor || "#B1E9D5"}
                finalColor={event.finalColor || "#00FFA3"}
                name={event.name}
                mode={event.mode}
                slots={event.slots}
                date={event.date}
                time={event.time}
                pool={event.pool}
                fee={event.fee}
                onClick={() => navigate(`/event/${event.id}`)} // Navigate to event details page
              />
            ))
          ) : (
            <p className="text-white text-center">Loading events...</p>
          )}
        </div>
      </div>
    </div>
  );
};
