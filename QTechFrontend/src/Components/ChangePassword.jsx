import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MainHome from "./MainHome";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailValidated, setEmailValidated] = useState(false);

  const onValidateEmail = async () => {
    try {
      const response = await axios.post("http://localhost:5104/api/Qtech/forgotpassword", { email });

      if (response.status === 200) {
        setEmailValidated(true);
        alert("OTP sent to your email");
      } else {
        alert("Invalid email");
      }
    } catch (error) {
      console.error("Error validating email:", error);
      alert("Error validating email");
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5104/api/Qtech/verifyotp", { email, otp, newPassword });

      if (response.status === 200) {
        alert("Password updated successfully");
        navigate("/");
      } else {
        alert("Invalid OTP or error updating password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Error updating password");
    }
  };

  return (
    <>
      {/* <MainHome/> */}
      <div className="flex mt-[-15%] min-h-full flex-col justify-center lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto pt-60 h-80 w-auto text-center" src="Qtech.png" alt="QTech" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Update Your Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={onChangePassword}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2 flex">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={emailValidated}
                />
                <button
                  type="button"
                  className="ml-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={onValidateEmail}
                  disabled={emailValidated}
                >
                  Validate
                </button>
              </div>
            </div>

            {emailValidated && (
              <>
                <div>
                  <label htmlFor="otp" className="block text-sm/6 font-medium text-gray-900">
                    OTP
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm/6 font-medium text-gray-900">
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm/6 font-medium text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Change Password
              </button>
            </div>
          </form>

         
        </div>
      </div>
    </>
  );
};

export default ChangePassword;