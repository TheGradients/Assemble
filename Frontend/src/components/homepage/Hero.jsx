import { Ashpalt } from "../ui/Cards/Ashpalt";
import { Bgmi } from "../ui/Cards/Bgmi";
import { Codm } from "../ui/Cards/Codm";
import { Freefire } from "../ui/Cards/Freefire";
import { Valo } from "../ui/Cards/Valo";
import { GameCard } from "./GameCard";
import { NoticeCard } from "./NoticeCard";

export default function Hero(props) {
  return (
    <div className="no-scrollbar h-[90%] w-[90%] ">
      {/* greet */}
      <section>
        <div className="">
          <h1 className="uppercase font-bebas font-bold tracking-wide text-[3.5rem] leading-6 text-black">
            Welcome,
          </h1>
          <h1 className="uppercase font-bebas font-bold tracking-wide text-[3.5rem]  text-white">
            {props.name}
          </h1>
        </div>
      </section>
      {/* board */}
      <section className="bg-[#151313e2] flex justify-between gap-4 px-1 pb-1 rounded-xl text-white font-bebas w-[70%] h-[38%] ">
        <div className="flex flex-col h-[100%] w-[30%] items-center justify-start">
          <h1 className="uppercase font-bebas font-semibold tracking-wider text-xl py-2 text-white">
            Top Rated Series
          </h1>
          <div className=" flex flex-col items-center cursor-pointer">
            <div className="w-[100%] h-[40%] overflow-hidden rounded-lg hover:h-[55%]  ease-in-out  transition-all z-0">
              <img
                className="-translate-y-12"
                src="../../../public/svgviewer-png-output.png"
                alt=""
              />
            </div>
            <h1 className="text-4xl font-semibold tracking-widest -mt-9 z-20">
              Night Hunter
            </h1>
            <h3 className="text-sm tracking-wide">
              We go live every day from 6 PM to noon !
            </h3>
          </div>
        </div>
        <div className="flex flex-col h-[100%] w-[70%] items-center ">
          <div>
            <h1 className="uppercase py-2 font-bebas font-semibold tracking-wider  text-xl text-white">
              choose your best match of series, among all games.
            </h1>
          </div>
          <div className="h-[80%] w-[100%] no-scrollbar overflow-y-scroll">
            <NoticeCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} date="06 oct" time="7:00 PM" pool="1650INR" fee="29inr" />
            <NoticeCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"smth pls work"} date="06 oct" time="8:00 PM" pool="3000INR" fee="40inr"/>
            <NoticeCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} date="07 oct" time="9:00 PM" pool="1650INR" fee="29inr"/>
            <NoticeCard initialColor={"#00AF60"} viaColor={"#B1E9D5"} finalColor={"#00FFA3"} name={"night hunter - r7"} date="07 oct" time="10:00 PM" pool="1650INR" fee="29inr"/>
          </div> 
        </div>
      </section>
      {/* card */}
      <section className="mt-4 w-[90vw] no-scrollbar overflow-x-scroll ">
        <div className="flex h-[49vh] justify-between w-[98vw]  overflow-hidden">
          <GameCard card={<Bgmi/>}/>
          <GameCard card={<Codm/>}/>
          <GameCard card={<Valo/>} />
          <GameCard card={<Freefire/>} />
          <GameCard card={<Bgmi/>} />
        </div>

      </section>
    </div>
  );
}
