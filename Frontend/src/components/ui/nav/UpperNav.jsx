import { NavIcons } from "../icons/NavIcons";
import { ProfileIcon } from "../icons/ProfileIcon";
import Logo from "../svg/Logo";
import {NavBell} from "../svg/NavBell";
import { NavPayment } from "../svg/NavPayment";
import NavConsole from "./NavConsole";

const UpperNav = (props) => {
  return (
    <div className="relative h-[10vh] w-[100%]  ">
      <div className="w-full p-4 top-0 h-[10%] fixed flex justify-between z-10 ">
        <div className="w-[12%]">
          <Logo />
        </div>
        <div className="relative w-[30%] z-10">
          <NavConsole name={props.name} />
        </div>
        <div className=" w-[11%]  flex justify-between items-center z-10">
          <NavIcons icons={<NavPayment />} />
          <NavIcons icons={<NavBell />} />
          <ProfileIcon />
        </div>
      </div>
    </div>
  );
};
export default UpperNav;
