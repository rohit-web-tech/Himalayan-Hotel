import React, { useState } from 'react'
import NavBtn from './NavBtn.jsx'
import { useNavigate } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { logout } from '../../store/slice/user.js';
import { useDispatch } from 'react-redux';
import { fetchGetData } from '../../lib/fetchData.js';
import { message } from 'antd';
import Modal from "../modal/Modal.jsx";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showNav, setShowNav] = useState(false);
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
    });

    const closeModal = () => {
        setShowModal(false);
    }

    const logoutUser = async () => {
        try {
            const res = await fetchGetData("/user/logout", setModalLoading);
            if (res?.success) {
                navigate("/login");
            } else {
                message.error(res?.message)
            }
        } catch (error) {
            message.error(error.message)
        } finally {
            dispatch(logout())
            closeModal();
        }
    }

    const handleLogOut = () => {
        setModalData(() => (
            {
                title: "Are you sure you want to log out?",
                desc: "You will need to sign in again to access your account. ",
                confirmText: "Logout",
                cancelText: "Stay Login"
            }
        ));
        setShowModal(true);
    }

    const closeNav = () => {
        setShowNav(false);
    }

    return (
        <>
            <div
                className='bg-gray-700 py-2 px-3 text-white absolute text-lg'
                onClick={() => setShowNav(true)}
            ><RxHamburgerMenu /></div>
            <div className={`z-50 w-[300px] fixed top-0 left-0 bg-gray-700 text-white h-full md:flex ${showNav ? "flex" : "hidden"} flex-col items-center justify-between py-6`}>
                <Modal
                    show={showModal}
                    confirmText={modalData?.confirmText}
                    cancelText={modalData?.cancelText}
                    onConfirm={logoutUser}
                    loading={modalLoading}
                    title={modalData?.title}
                    desc={modalData?.desc}
                    type="confirm"
                    onCancel={closeModal}
                />
                <div
                    className='text-2xl absolute right-3 top-3 md:hidden block'
                    onClick={closeNav}
                ><IoMdClose /></div>
                <div onClick={() => navigate("/")}>
                    <h1 className='text-xl font-bold hover:cursor-pointer'>Admin Panel</h1>
                    <p className='text-xs text-gray-200 text-center'>Himalayan Hotel</p>
                </div>
                <ul className='flex flex-col items-center justify-between gap-2'>
                    <li>
                        <NavBtn
                            to="/users"
                            handleClick={closeNav}
                        >Users</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/admins"
                            handleClick={closeNav}
                        >Admins</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/bookings"
                            handleClick={closeNav}
                        >Bookings</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/rooms"
                            handleClick={closeNav}
                        >Rooms</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/home"
                            handleClick={closeNav}
                        >Home</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/about"
                            handleClick={closeNav}
                        >About Us</NavBtn>
                    </li>
                    <li>
                        <NavBtn
                            to="/contact"
                            handleClick={closeNav}
                        >Contact Us</NavBtn>
                    </li>
                </ul>
                <div className='bg-red-600 py-1 hover:bg-red-800 hover:cursor-pointer w-44 text-sm rounded-md text-center'
                    onClick={handleLogOut}
                >
                    Logout
                </div>
            </div>
        </>
    )
}

export default Navbar
