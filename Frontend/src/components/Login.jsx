import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { API_END_POINT } from "./utils/constant";
const Login = () => {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getInputData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/login', {
        username,
        password,
      }, {
        withCredentials: true,
      });
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error during API call:', error);
    }
    setEmail("");
    setPassword("");
  };

  const cantSignin = (e) => {
    e.preventDefault();
    navigate("/PassRecovery");
  };

  const handlePrivacyPolicyClick4 = (e) => {
    e.preventDefault();
    navigate("/Register");
  };

  return (
    <div className="body">
      <div className="page">
        <Header />
        <form onSubmit={getInputData}>
          <div className="sign-in-box">
            <div className="container">
              <h2 className="sign-in-box-heading">Sign In</h2>
            </div>
            <input
              className="input-box"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="input-box"
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <input
                className="check-box"
                type="checkbox"
                id="staySignedIn"
              />
              <label className="check-text font-medium" htmlFor="staySignedIn">
                Stay Signed In
              </label>
            </div>
            <button type="submit" className="sign-in-button">
              CONTINUE
            </button>
            <div className="flex justify-between">
              <button
                className="font-medium"
                onClick={cantSignin}
              >
                Can&apos;t Sign In
              </button>
              <button
                className="font-medium"
                onClick={handlePrivacyPolicyClick4}
              >
                Create a New Account
              </button>
            </div>
            <p className="end-text">Tournament Supported Games</p>
            <div className="logo flex justify-between">
              <div className="pubg"></div>
              <div className="valorant"></div>
              <div className="coc"></div>
              <div className="cod"></div>
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
