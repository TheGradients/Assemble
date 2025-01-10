import navConsole from "../../../assets/navConsole.svg";
import { TeamLogo } from "../svg/TeamLogo";
const NavConsole = (props) => {
  return (
    <div className=" h-[100%] w-[100%] p-[1%]  bg-[#151313c5] clip-path-navConsole relative flex items-center justify-center ">
      <div className="flex items-center justify-between  w-[90%] ">
        <div className=" cursor-pointer">
            <TeamLogo/>
        </div>
        <div className=" ">
          <h1 className="text-white uppercase font-semibold tracking-wider ">{props.name}</h1>
        </div>
        <div className="cursor-pointer">
            <TeamLogo/>
        </div>
      </div>
    </div>
  );
};
export default NavConsole;
