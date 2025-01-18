import { EventCard } from "../ui/GameCards/EventCard";
import { GradientText } from "../ui/GradientElements/GradientText";

export const Hero = (props) => {
  return (
    <div className="no-scrollbar font-bebas flex flex-col gap-2 h-[100%] w-[100%]   ">
      <div className=" w-[20%] h-[17%]  gap-4 bg-[#0000009f] flex items-center justify-center  p-4 rounded-xl  ">
        <div className=" w-auto  ">
          <h1 className="text-[#87c5af] font opacity-100 font-bold w-[100%]  text-[4.5rem] ">
            01
          </h1>
        </div>
        <div className=" w-[60%]  opacity-100  ">
          <GradientText size="3xl" text="battleground " />
          <br />
          <GradientText size="3xl" text="mobile india" />
        </div>
      </div>
      <div className="flex h-[85%] gap-4 w-[100%]  ">
        {/* upcoming and ongoin series */}
        <div className="w-[20%] h-[70vh]  gap-2  bg-[#0000009f] rounded-xl  flex flex-col items-center px-4 py-2 ">
          <div className=" brightness-125 ">
            <GradientText size="lg" text="upcoming and ongoing series" />
          </div>
          <div className=" flex flex-col h-[30%]  items-center cursor-pointer">
            <div className="w-[100%]  h-[100%] overflow-hidden rounded-lg  z-0">
              <img
                className="-translate-y-10"
                src="../../../public/svgviewer-png-output.png"
                alt=""
              />
            </div>
            <h1 className="text-3xl text-white font-semibold tracking-widest -mt-8 z-20">
              Night Hunter
            </h1>
            <h3 className="text-xs text-center text-white tracking-wide">
              We go live every day from 6 PM to noon !
            </h3>
          </div>
          <div className=" flex flex-col ease-in-out  transition-all z-0 hover:max-h-[35%] max-h-[25%] items-center cursor-pointer">
            <div className="w-[100%] h-[100%] overflow-hidden rounded-lg   ease-in-out  transition-all z-0">
              <img
                className="-translate-y-20  "
                src="https://media.discordapp.net/attachments/1325349777659002880/1330121914622148678/image.png?ex=678cd410&is=678b8290&hm=de4e6b9515ccc76f07097f6ec10ec997d64c6b7b6c89cb5f7368b9ba8bffe2cd&=&format=webp&quality=lossless&width=246&height=437"
                alt=""
              />
            </div> 
            <h1 className="text-3xl  text-white font-semibold tracking-widest -mt-8 z-20">
              sunday wars
            </h1>
            <h3 className="text-sm  text-white tracking-wide">
              We go live every day from 6 PM to noon !
            </h3>
          </div>
          
          <div className=" flex flex-col h-[35%] items-center cursor-pointer">
            <div className="w-[100%]  max-h-[60%] overflow-hidden rounded-lg hover:max-h-[100%]  ease-in-out  transition-all z-0">
              <img
                className="-translate-y-10  "
                src="https://media.discordapp.net/attachments/1325349777659002880/1330122290914005043/image.png?ex=678cd46a&is=678b82ea&hm=e5b4db758a56eb7f1ae636c5ab8e90a3361f8a089fcafeaa83f255c17e13f690&=&format=webp&quality=lossless&width=437&height=437"
                alt=""
              />
            </div> 
            <h1 className="text-3xl   text-white font-semibold tracking-widest -mt-8 z-20">
              Night Hunter
            </h1>
            <h3 className="text-sm  text-white tracking-wide">
              We go live every day from 6 PM to noon !
            </h3>
          </div>
          
        </div>
        <div className=" w-[80%] h-[100%]   overflow-y-scroll no-scrollbar  rounded-xl  ">
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
          <EventCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} mode={"solo"} slots={"60/100"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr"/>
         
        </div>
      </div>
    </div>
  );
};
