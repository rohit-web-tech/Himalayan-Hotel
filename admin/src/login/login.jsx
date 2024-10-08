import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { message } from "antd"
import "./style.scss";
import { fetchData } from '../lib/fetchData';
import Loader from '../components/loader';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/user';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    password: ""
  });
  const loginAdmin = async (e) => {
    e.preventDefault();
    if (adminDetails?.email != "" && adminDetails?.password != "") {
      const res = await fetchData("/user/adminLogin", setLoading, "POST", adminDetails);
      if (res?.success) {
        dispatch(login(res?.data));
        navigate("/");
      } else {
        message.error(res?.message || "Something went wrong please try again after some time!!");
      }
    } else {
      message.warning("All Feilds are required!!");
    }
  }

  const handleUserInput = (e) => {
    setAdminDetails({ ...adminDetails, [e.target.name]: e.target.value });
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
                  value={adminDetails.email}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Email"
                  type="email"
                  name="email"
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
                {loading ? <Loader styles="h-4 w-4"/> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login