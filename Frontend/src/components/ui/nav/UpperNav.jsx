import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion
import { ProfileIcon } from "../icons/ProfileIcon";
import Logo from "../svg/Logo";
import { NavBell } from "../svg/NavBell";
import { NavPayment } from "../svg/NavPayment";
import NavConsole from "./NavConsole";
import NavBellMenu from "../../overlays/NavbellMenu";
import NavPaymentMenu from "../../overlays/NavPaymentMenu";
import ProfileMenu from "../../overlays/ProfileMenu";

const UpperNav = (props) => {
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open

  // Function to toggle menus
  const handleMenuToggle = (menuType) => {
    setOpenMenu((prev) => (prev === menuType ? null : menuType));
  };

  return (
    <div className="relative h-[10vh] w-[100%]">
      <div className="w-full p-4 top-0 h-[10%] fixed flex justify-between z-10">
        <div className="w-[12%]">
          <Logo />
        </div>
        <div className="relative w-[30%] z-10">
          <NavConsole name={props.name} />
        </div>
        <div className="w-[11%] flex justify-between items-center z-10 relative">
          {/* NavPayment Icon */}
          <div
            onClick={() => handleMenuToggle("payment")}
            className="cursor-pointer relative"
          >
            <NavPayment className="bg-black" />
          </div>
          <AnimatePresence>
            {openMenu === "payment" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20  rounded-2xl"
              >
                <NavPaymentMenu />
              </motion.div>
            )}
          </AnimatePresence>

          {/* NavBell Icon */}
          <div
            onClick={() => handleMenuToggle("bell")}
            className="cursor-pointer relative "
          >
            <NavBell className="bg-black " />
          </div>
          <AnimatePresence>
            {openMenu === "bell" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20  rounded-2xl"
              >
                <NavBellMenu />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Icon */}
          <div
            onClick={() => handleMenuToggle("profile")}
            className="cursor-pointer relative"
          >
            <ProfileIcon />
          </div>
          <AnimatePresence>
            {openMenu === "profile" && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-12 right-0 bg-white shadow-lg z-20  rounded-2xl"
              >
                <ProfileMenu />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default UpperNav;
