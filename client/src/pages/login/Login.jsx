import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd';
import Loader from '../../components/loader';
import { fetchData } from '../../lib/fetchData';
import InputBox from '../../components/InputBox';
const Login = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    userEmail: "",
    userPassword: ""
  })

  const handleUserInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (userData.userPassword != "" && userData.userEmail != "") {

      const res = await fetchData(`/loginUser`, setLoading, "POST", userData);
      if (res.message == "success") {
        localStorage.setItem("akhoteluser", JSON.stringify(res[0]))
        message.success('Logged in successfully!!');
        setUserData(({ userEmail: "", userPassword: "" }))
        navigate("/");
      } else {
        message.error('Invalid Email or Password');
      }
    } else {
      message.warning('Please fill all the fields!!');
      return;
    }
  }

  return (
    <div className="flex min-h-[500px] items-center justify-center bg-white p-12">
      <form action="">
        <div className="max-w-lg rounded-xl bg-gradient-to-b from-sky-300 to-purple-500 p-px">
          <div className="rounded-[calc(1.5rem-1px)] bg-gray-100 px-10 p-12 shadow-sm shadow-black">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Login to your account</h1>
              <p className="text-xs tracking-wide text-gray-600">Don't have an account ? <Link to="/signup" className="text-blue-600 transition duration-200 hover:underline">Sign Up</Link> for free!</p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="space-y-6">
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.userEmail}
                  placeholder="Your Email"
                  type="email"
                  name="userEmail"
                />
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.userPassword}
                  placeholder="Your Email"
                  type="password"
                  name="userPassword"
                />
              </div>

              <button onClick={handleLogin} className={`h-9 px-3 w-full ${loading ? "bg-slate-300" : "bg-[--primary-color]"} hover:bg-gray-700 transition duration-500 rounded-md text-white text-sm`}>
                {loading ? <Loader styles='h-6 w-6' /> : "Login"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login
