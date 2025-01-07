import { GradientText } from "../ui/GradientElements/GradientText";

export const NoticeCard = (props) => {
  return (
    <div className="bg-black rounded-2xl mb-2 w-[100%] h-[40%] flex justify-evenly items-center px-2 font-bebas gap-1 cursor-pointer ">
      <div className=" w-[17%] h-fit flex flex-col  ">
        <GradientText
          text={"name"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <h1
          className={`font-semibold -mt-1 leading-6 w-[100%] tracking-wide text-[1.4rem]`}
        >
          {props.name}
        </h1>
      </div>
      <div className=" w-[18%] flex flex-col justify-center items-center ">
        <GradientText
          text={"Match Date"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <Text width="100px" text={props.date} />
      </div>
      <div className=" w-[18%] flex flex-col justify-center items-center ">
        <GradientText
          text={"Start Time"}
          initialColor={props.initialColor}
          viaColor={props.viaColor}
          finalColor={props.finalColor}
          size={"sm"}
        />
        <Text width="100px" text={props.time} />
      </div>
      <div className=" w-[18%] flex flex-col justify-center items-center ">
        <GradientText
          text={"Prize pool"}
          initialColor={"#00AF60"}
          viaColor={"#B1E9D5"}
          finalColor={"#00FFA3"}
          size={"sm"}
        />
        <Text width="100px" text={props.pool} />
      </div>
      <div
        className={` w-[18%] flex flex-col justify-center items-center bg-gradient-to-r from-[${props.initialColor}] via-[${props.viaColor}] to-[${props.finalColor}] rounded-xl h-[60px] `}
      >
        <h1
          class={`text-black font-bebas uppercase font-semibold text-sm tracking-wide`}
        >
          Entry price
        </h1>
        <h1
          className={`font-semibold leading-7  tracking-wide text-black text-2xl`}
        >
          {props.fee}
        </h1>
      </div>
    </div>
  );
};
function Text(props) {
  return (
    <h1 className={`font-semibold leading-7  tracking-wide text-2xl`}>
      {props.text}
    </h1>
  );
}
