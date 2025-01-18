import { GradientText } from "../GradientElements/GradientText";
import { HeartIcon } from "../icons/HeartIcon";

export const EventCard = (props) => {
  return (
    <div className="  mb-8 bg-[#000000e9]  rounded-2xl  w-[100%] h-[15%] flex justify-evenly items-center text-white p-2 font-bebas  cursor-pointer ">
      <div className=" w-[17%] mx-1 border-r-2 h-full flex   ">
        <div className="flex flex-col w-[60%]">
        <GradientText
          text={"name"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <h1
          className={`font-semibold -mt-1 leading-6 w-[100%] tracking-wide text-2xl`}
        >
          {props.name}
        </h1>
        </div>
        <div className="w-[40%] h-full flex justify-center ">
          <HeartIcon/>
        </div>
      </div>
      <div className="flex px-8 w-[25%] h-full justify-between border-r-2 ">
        <div className="   flex flex-col justify-center items-center ">
          <GradientText
            text={"Match Date"}
            initialColor={props.initialColor}
            viaColor={props.viaColor}
            finalColor={props.finalColor}
            size={"sm"}
          />
          <Text width="100px" text={props.date} />
        </div>
        <div className="   flex flex-col justify-center items-center ">
          <GradientText
            text={"Start Time"}
            initialColor={props.initialColor}
            viaColor={props.viaColor}
            finalColor={props.finalColor}
            size={"sm"}
          />
          <Text width="100px" text={props.time} />
        </div>
      </div>
      <div className="w-[20%] border-r-2 h-full flex flex-col justify-center items-center ">
        <GradientText
          text={"Total Slots"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <Text width="100px" text={props.slots} />
      </div>
      <div className=" w-[15%] flex flex-col justify-center items-center ">
        <GradientText
          text={"Prize pool"}
          initialColor={"#00AF60"}
          viaColor={"#B1E9D5"}
          finalColor={"#00FFA3"}
          size={"sm"}
        />
        <Text width="100px" text={props.pool} />
      </div>
      <div className="w-[12%]  flex flex-col justify-center items-center ">
        <GradientText
          text={"Mode"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <Text width="100px" text={props.mode} />
      </div>
      <div
        className={` w-[12%] flex flex-col justify-center items-center bg-gradient-to-r from-[${props.initialColor}] via-[${props.viaColor}] to-[${props.finalColor}] rounded-xl h-[60px] `}
      >
        <h1
          class={`text-black font-bebas uppercase font-semibold text-sm tracking-wide`}
        >
          Entry price
        </h1>
        <h1
          className={`font-semibold leading-7  tracking-wide text-black text-3xl`}
        >
          {props.fee}
        </h1>
      </div>
    </div>
  );
};
function Text(props) {
  return (
    <h1 className={`font-semibold leading-7  tracking-wide text-3xl`}>
      {props.text}
    </h1>
  );
}
