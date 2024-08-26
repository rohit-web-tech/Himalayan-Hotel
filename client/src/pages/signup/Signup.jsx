import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd';
import Loader from '../../components/loader';

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    userName: "",
    userNumber: "",
    userEmail: "",
    userPassword: ""
  })

  const handleUserInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    //checking for blank input
    if (userData.userName != "" && userData.userPassword != "" && userData.userEmail != "" && userData.userNumber != "") {
      //checking for a valid mobile number
      if (userData.userNumber.length === 10) {
        setLoading(true);
        fetch(`${BASE_URL}/registerUser`, {
          "method": "POST",
          "body": JSON.stringify(userData),
          "headers": {
            "content-type": "application/json"
          }
        }).then(res => res.json())
          .then(res => {
            console.log(res)
            if (res.message == "success") {
              localStorage.setItem("akhoteluser", JSON.stringify(res?._doc))
              message.success("Sign Up Successfully!!");
              setUserData(({ userName: "", userNumber: "", userEmail: "", userPassword: "" }))
              navigate("/");
            } else {
              message.error(res.message);
            }
          }).catch(err => {
            console.log("Error encountered!!");
            message.error(err);
          }).finally(()=> setLoading(false))
      } else {
        message.warning("Please Enter a Valid Indian Mobile Number without Country Code(+91)!!")
      }
    } else {
      message.warning("All Feilds are required!!");
      return;
    }
  }

  return (
    <div className="flex min-h-[600px] items-center justify-center bg-white p-12">
      <form action="">
        <div className="max-w-lg rounded-xl bg-gradient-to-b from-sky-300 to-purple-500 p-px">
          <div className="rounded-[calc(1.5rem-1px)] bg-gray-100 px-10 p-12 shadow-sm shadow-black">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Create an Account</h1>
              <p className="text-xs tracking-wide text-gray-600">Already have an account ? <Link to="/login" className="text-blue-600 transition duration-200 hover:underline">Login Now</Link></p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="space-y-6">
                <input
                  onChange={handleUserInput}
                  value={userData.userName}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Name"
                  type="text" name="userName"
                  id="name" />
                <input
                  onChange={handleUserInput}
                  value={userData.userEmail}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Email"
                  type="email"
                  name="userEmail"
                  id="email" />
                <input
                  onChange={handleUserInput}
                  value={userData.userNumber}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Contact Number"
                  type="number"
                  name="userNumber"
                  id="number" />
                <input
                  onChange={handleUserInput}
                  value={userData.userPassword}
                  className="w-full bg-transparent text-gray-600 rounded-md border border-gray-400 px-3 py-2 text-xs placeholder-gray-600 invalid:border-red-500"
                  placeholder="Your Password"
                  type="password"
                  name="userPassword"
                  id="password" />
              </div>

              <button onClick={handleSignUp} className={`h-9 px-3 w-full ${loading ? "bg-slate-300" : "bg-[--primary-color]"} hover:bg-gray-700 transition duration-500 rounded-md text-white text-sm`}>
                {loading ? <Loader styles='h-6 w-6'/> : "Register"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
