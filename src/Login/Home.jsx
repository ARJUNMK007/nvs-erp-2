import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebabse";

function Homes() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();

   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
       console.log("Login successful:", userCredential); // Debug log
       const user = userCredential.user;
       localStorage.setItem("user_id", user.uid);
       navigate("/dashboard");
     })
     .catch((error) => {
       console.error("Error signing in:", error.message); // Error log
     });
  };

  return (
    <div className="Home-Container">
      <div className="Left-Container">
        <div className="form-container">
          <form onSubmit={handleSignIn}>
            <img src="" alt="logo" className="sigin-img" />
            <div className="sigin-title">
              <h3>Real-time tracking of inventory levels</h3>
            </div>
            <div className="sign-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
            </div>
            <div className="sign-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40, width: 404 }}>
              <button className="signIn-btn" type="submit">
                Sign In
              </button>
            </div>
            <div className="centered-text">
              <h4 className="forgot">Forgot Password?</h4>
            </div>
          </form>
        </div>
      </div>
      <div className="Right-Container">
        <img src="./Images/express.svg" alt="home" className="Home-Img" />
      </div>
    </div>
  );
}

export default Homes;
