import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="peepee min-h-screen flex items-center justify-center bg-blue-300">
      <div className="peepee-doc w-full max-w-lg pt-4 pl-4 pr-4 pb-4">
        <form className="flex flex-col justify-between items-center gap-3 bg-white   rounded-lg">
          <div className="flex gap-20 w-full">
            <div className="back">
              <IoArrowBackCircleOutline size={30} color="black" />
            </div>
            <div className="sign-in-box-heading text-lg font-semibold">
              Contact Us
            </div>
          </div>

          <div className="head-text text-center text-sm mb-6">
            Connect with us, we are here to help you and improve your esports
            experience.
          </div>

          <input
            className="input-box-contact w-full p-2 mb-4 border rounded"
            placeholder="USERNAME"
          />
          <input
            className="input-box-contact w-full p-2 mb-4 border rounded"
            placeholder="Email Id"
            type="email"
          />
          <textarea
            className="input-box-contact w-full p-2 mb-4 border rounded h-36"
            placeholder="Your Message"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-black rounded-2xl"
          >
            CONTINUE
          </button>
          <div className="flex gap-3 -ml-28">
            <div>
              <IoMail size={23} />
            </div>
            <p className="">gamezoneunitedindia@gmail.com</p>
          </div>
          <div className="flex gap-3 -ml-52">
            <div>
              <FaPhoneAlt size={23} />
            </div>
            <p className="">+91-7665566259</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
