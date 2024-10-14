import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/authSlice";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import new eye icons

import video from '/spy.webm';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiUrl = import.meta.env.VITE_REACT_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${apiUrl}/api/users/login`, // Use apiUrl from environment variables
        { email, password },
        { withCredentials: true } // Ensure cookies are sent and received
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        dispatch(setUser(user));
        setSuccess("Login successful");
        setError("");
        toast.success("Login Success");
        navigate("/dashboard");
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log(error);
      setSuccess("");
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mt-4">
        {" "}
        {/* Add margin top for spacing */}
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <div className="flex justify-center m-auto">
          <video autoPlay loop muted>
            <source src={video} type="video/webm" />
            Your browser does not support the video tag. autoPlay loop muted
          </video>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-700 h-5 w-5 mt-8" />
              ) : (
                <AiFillEye className="text-gray-700 h-5 w-5 mt-8" />
              )}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white py-2 px-4 hover:rounded-full hover:opacity-85 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
