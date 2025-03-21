import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
const Register = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();
 
  const handleSendOtp = async () => {
    try {
      // Check if the email is already registered and send OTP
      const checkResponse = await axios.post("http://localhost:5104/api/Qtech/RegisterVerification", { email });
      if (checkResponse.data.exists) {
        setErrorMessage("You already have an account. Please log in.");
        return;
      }
 
      // Send OTP if email is not registered
      setOtpSent(true);
      setErrorMessage(""); // Clear any previous error messages
      alert("OTP sent to your email.");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };
 
  const handleResendOtp = async () => {
    try {
      // Resend OTP
      await axios.post("http://localhost:5104/api/Qtech/RegisterVerification", { email });
      alert("OTP resent to your email.");
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };
 
  const handleRegister = async (e) => {
    e.preventDefault();
 
    const user = {
      email,
      firstName,
      lastName,
      password,
      otp
    };
 
    try {
      const response = await axios.post("http://localhost:5104/api/Qtech/Registration", user);
      console.log(response.data);
 
      if (response.data) {
        alert("Registration successful");
        setIsRegistered(true);
        navigate("/login"); // Redirect to login page
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.error("There was an error registering the user!", error);
      alert("Registration failed. Please try again.");
    }
  };
 
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-[-20%]">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto z-20 pt-60 h-80 w-auto" src="Qtech.png" alt="QTech" />
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">Register Your Details</h2>
      </div>
 
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!isRegistered ? (
          <>
            {!otpSent ? (
              <>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                    required
                  />
                </div>
                <button onClick={handleSendOtp} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md">Send OTP</button>
                {errorMessage && (
                  <p className="mt-4 text-red-600">{errorMessage}</p>
                )}
              </>
            ) : (
              <>
                <form className="space-y-6" onSubmit={handleRegister}>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">Email address</label>
                    <div className="mt-2">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="fname" className="block text-sm font-medium text-gray-900">First Name</label>
                    <div className="mt-2">
                      <input
                        placeholder="Enter Your First Name"
                        type="text"
                        name="fname"
                        id="fname"
                        autoComplete="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label htmlFor="lname" className="block text-sm font-medium text-gray-900">Last Name</label>
                    <div className="mt-2">
                      <input
                        placeholder="Enter Your Last Name"
                        type="text"
                        name="lname"
                        id="lname"
                        autoComplete="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
 
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">Password</label>
                    <div className="mt-2">
                      <input
                        type="password"
                        placeholder="Enter Your Password"
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-900">Enter OTP</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-2 focus:outline-indigo-600">Register</button>
                    <button type="button" onClick={handleResendOtp} className="ml-4 bg-gray-600 text-white px-4 py-2 rounded-md">Resend OTP</button>
                  </div>
                </form>
              </>
            )}
          </>
        ) : (
          <p className="text-center text-green-600">Registration complete!</p>
        )}
      </div>
    </div>
  );
};
 
export default Register;