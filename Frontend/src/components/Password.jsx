import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate , useLocation} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Password = () => {
    const navigate = useNavigate();
     const handlePrivacyPolicyClickMinus7 = () => {
       navigate("/GamerTag");
     };
     const handleClick = async (e) => {
      navigate("/EmailVerification",{ state: { email } });

      try {
          const response = await axios.post(
            '/api/v1/users/register',
               {email,username,password})
            console.log(response);
           toast.success(response.data.message);
          } catch (error) {
             console.log(error);
             toast.error(error.response.data.message);
       }

     }

     const location = useLocation();
     const username = location.state?.username;
     const email = location.state?.email;
     console.log(username,email);
     const [password, setPassword] = useState("");
    
  // const getInputData = async (e) => {
  //   e.preventDefault();
  //   console.log(email,  username, password);

  //   setPassword("");
    

  //   // const user = { email, username, password };
  //   try {
  //     const response = await axios.post(
  //      '/api/v1/users/register',
  //       email,username,password)
  //     console.log(response);

  //     toast.success(response.data.message);
  //   } catch (error) {
  //     console.log(error);
  //      toast.error(error.response.data.message);
  //   }
  // };
     
  return (
    <>
   
      <div className="body">
        <div className="page">
          <Header />
           <form className="login-form" >
          <div className="sign-in-box ">
            <div className="container flex gap-2">
              <div className="flex flex-row gap-10">
                <div className="back" onClick={handlePrivacyPolicyClickMinus7}>
                  <IoArrowBackCircleOutline size={28} />
                </div>
                <div className="sign-in-box-heading ">Create A Password</div>
              </div>
              <div className="head-text">Make Sure, It's a good one.</div>
            </div>

            <div className="flex gap-5 flex-col" >
              <input className="input-box" placeholder="PASSWORD"></input>
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="input-box"
                placeholder="CONFIRM PASSWORD"
              ></input>

              <button onClick={handleClick} type="submit" className="sign-in-button">ENTER</button>
            </div>

            <div className="flex flex-col gap-5">
              <p className="end-text">Tournament Supported Games</p>
              <div className="logo flex justify-between">
                <div className="pubg"> </div>
                <div className="valorant"></div>
                <div className="coc"></div>
                <div className="cod"></div>
                
              </div>
            </div>
          </div>
          </form>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Password;