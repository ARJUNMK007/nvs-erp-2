import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/Firebabse"

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
    <div className="flex h-screen">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 bg-white">
        <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSignIn}>
            <img src="" alt="logo" className="mb-6 mx-auto w-32" />
            <h3 className="text-xl font-bold mb-6 text-center">
              Real-time tracking of inventory levels
            </h3>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Sign In
            </button>
            <div className="text-center mt-4">
              <a href="#" className="text-sm text-blue-500 hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:flex md:w-1/2 justify-center items-center">
        <img
          src="https://source.unsplash.com/600x800/?nature"
          alt="Dummy"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Homes;
