import navConsole from "../../../assets/navConsole.svg";
import { TeamLogo } from "../svg/TeamLogo";
const NavConsole = () => {
  return (
    <div className=" h-[45px] w-[30vw] p-2  bg-[#151313c5] clip-path-navConsole relative flex items-center justify-between ">
      <div className="flex items-center justify-between w-full m-6 ">
        <div className=" cursor-pointer">
            <TeamLogo/>
        </div>
        <div className=" ">
          <h1 className="text-white uppercase font-semibold tracking-wider ">Homepage</h1>
        </div>
        <div className=" cursor-pointer">
            <TeamLogo/>
        </div>
      </div>
    </div>
  );
};
export default NavConsole;
