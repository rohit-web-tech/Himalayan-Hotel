import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd';
import Loader from '../../components/loader';
import { fetchData } from '../../lib/fetchData';
import InputBox from '../../components/InputBox';
import Modal from '../../components/modal/Modal';

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: ""
  })
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    title: "",
    desc: "",
    cancelText: "",
    confirmText: ""
  });

  const closeModal = () => {
    setShowModal(false);
  }

  const handleConfirm = () => {
    navigate("/");
    closeModal();
  }

  const openModal = () => {
    setModalData(() => (
      {
        title: "Verify Your Email !!",
        desc: "We have sent you an email for verification. Please verify your email by clicking on the link given through mail to complete verification process.",
        confirmText: "Ok",
        cancelText: ""
      }
    ));
    setShowModal(true);
  }

  const handleUserInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (userData.name != "" && userData.password != "" && userData.email != "" && userData.contactNumber != "") {
      if (userData.contactNumber.length === 10) {
        const res = await fetchData(`/user/registerUser`, setLoading, "POST", userData)

        if (res?.success) {
          openModal();
          setUserData(({ userName: "", userNumber: "", userEmail: "", userPassword: "" }))
        } else {
          message.error(res.message);
        }

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
      <Modal
        show={showModal}
        confirmText={modalData?.confirmText}
        onConfirm={handleConfirm}
        loading={false}
        title={modalData?.title}
        desc={modalData?.desc}
        type="alert"
      />
      <form action="">
        <div className="max-w-lg rounded-xl bg-gradient-to-b from-sky-300 to-purple-500 p-px">
          <div className="rounded-[calc(1.5rem-1px)] bg-gray-100 px-10 p-12 shadow-sm shadow-black">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Create an Account</h1>
              <p className="text-xs tracking-wide text-gray-600">Already have an account ? <Link to="/login" className="text-blue-600 transition duration-200 hover:underline">Login Now</Link></p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="space-y-6">
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.name}
                  placeholder="Your Name"
                  type="text"
                  name="name"
                />
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.email}
                  placeholder="Your Email"
                  type="email"
                  name="email"
                />
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.contactNumber}
                  placeholder="Your Contact Number"
                  type="number"
                  name="contactNumber"
                />
                <InputBox
                  handleChange={handleUserInput}
                  value={userData.password}
                  placeholder="Your Password"
                  type="password"
                  name="password"
                />
              </div>

              <button onClick={handleSignUp} className={`h-9 px-3 w-full ${loading ? "bg-slate-300" : "bg-[--primary-color]"} hover:bg-gray-700 transition duration-500 rounded-md text-white text-sm`}>
                {loading ? <Loader styles='h-6 w-6' /> : "Register"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Signup
