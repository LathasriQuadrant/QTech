
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import AuthContext from "./AuthContext";
import { useContext, useState } from "react";

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login,isLogged} = useContext(AuthContext);

  const handleEmail = (e) => {
    setMail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePassword = () => {
    navigate("/ChangePassword");
    console.log("Hello");
  };

  const onRegister = () => {
    navigate("/Register");
  };

  const onSubmitSuccess = async (e) => {
    e.preventDefault();
    const loginObject = {
      email: mail,
      password: password
    };
    

    try {
      const response = await axios.post('http://localhost:5104/api/Qtech/login', loginObject);

      if (response.data.token) {
        login(response.data.token, response.data.role, mail);
         // Store token, role, and email in context
      
        console.log(response.data.role);
      
        if (response.data.role === "Admin" || isLogged) {
          navigate("/Admin/Actions");
        } else if (response.data.role === "Manager" || isLogged) {
          navigate("/Manager/Actions");
        } else {
          navigate("/UserDashBoard" || isLogged);
        }
      }

    } catch (error) {
      console.error('Error during login:', error);
      alert("Invalid login");
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <>
      {/* <MainHome /> */}
      <div className="flex flex-col justify-center px-0 py-0 lg:px-8 m-0 p-0 mt-[-18%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto z-20 pt-60 h-80 w-auto" src="Qtech.png" alt="QTech" />
          <h2 className="text-center top-20 mt-0 text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={onSubmitSuccess}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  placeholder="Enter Your Email"
                  onChange={handleEmail}
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  onChange={handlePassword}
                  placeholder="Enter Your Password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
              <div className="text-sm">
                <a href="#" className="font-semibold text-violet-800 hover:text-indigo-500" onClick={onChangePassword}>
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log in
              </button>
            </div>
          </form>

          <p className="text-center text-sm/6 text-gray-500">
            Don't have an account?
            <a href="#" className="font-semibold text-violet-800 hover:text-indigo-500" onClick={onRegister}>
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;