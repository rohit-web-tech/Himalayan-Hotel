import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import {message} from "antd"
import "./style.scss";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    userName: "",
    password: ""
  });
  const loginAdmin = (e) => {
    e.preventDefault();
    if (adminDetails.userName != "" && adminDetails.password != "") {
      fetch(`${BASE_URL}/adminLogin`, {
        "method": "POST",
        "body": JSON.stringify(adminDetails),
        "headers": {
          "content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.message === "success") {
            localStorage.setItem("akhoteladmin", JSON.stringify(res))
            navigate("/");
          } else {
            message.error(res.message);
          }
        }).catch(err => console.log(err));
    } else {
      message.warning("All Feilds are required!!");
    }
  }

  const handleUserInput = (e) =>{
    setAdminDetails({...adminDetails,[e.target.name]:e.target.value});
  }
  return (
    <div className="flex min-h-screen py-20 items-center justify-center bg-white p-12">
      <form action="">
        <div className="max-w-lg rounded-xl bg-gradient-to-b from-sky-300 to-purple-500 p-px">
          <div className="rounded-[calc(1.5rem-1px)] bg-gray-100 px-10 p-12 shadow-sm shadow-black">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Login As Himalayan Hotel Admin</h1>
            </div>

            <div className="mt-8 space-y-8">
              <div className="space-y-6">
                <input
                  onChange={handleUserInput}
                  value={adminDetails.userName}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Email"
                  type="email"
                  name="userName"
                  id="email" />
                <input
                  onChange={handleUserInput}
                  value={adminDetails.password}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500 "
                  placeholder="Your Password"
                  type="password"
                  name="password"
                  id="password" />
              </div>

              <button onClick={loginAdmin} className="h-9 px-3 w-full bg-[--primary-color] hover:bg-gray-700 transition duration-500 rounded-md text-white text-sm">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login