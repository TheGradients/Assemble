import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    setErrorMessage("");


    try {
      const response = await axios.post(
        "/api/v1/users/login",
        { username, password },
        { withCredentials: true }
      );
      console.log(username,password);
      if (response.status === 200 && response.data.success) {
        console.log("API Response:", response.data);
        navigate("/browse");
        setUsername("");
        setPassword("");
      } else {
        setErrorMessage(response.data.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="body">
      <div className="page">
        <Header />
        <form onSubmit={handleSubmit}>
          <div className="sign-in-box">
            <div className="container">
              <h2 className="sign-in-box-heading">Sign In</h2>
            </div>
            <input
              className="input-box"
              placeholder="USERNAME"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input-box"
              type="password"
              placeholder="PASSWORD"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex gap-2">
              <input className="check-box" type="checkbox" id="staySignedIn" />
              <label className="check-text font-medium" htmlFor="staySignedIn">
                Stay Signed In
              </label>
            </div>
            <button type="submit" onClick={handleSubmit} className="sign-in-button">
              CONTINUE
            </button>
            {errorMessage && (
              <p className="error-message text-red-500">{errorMessage}</p>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                className="font-medium"
                onClick={() => navigate("/PassRecovery")}
              >
                Can't Sign In
              </button>
              <button
                type="button"
                className="font-medium"
                onClick={() => navigate("/Register")}
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
