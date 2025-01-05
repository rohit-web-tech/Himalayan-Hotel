import React, { useState } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Loader from '../../components/loader'
import { useDispatch, useSelector } from 'react-redux';
import { fetchGetData } from '../../lib/fetchData';
import Modal from '../../components/modal/Modal.jsx';
import { logout } from '../../store/slice/user.slice.js';
import { Route, Routes } from 'react-router-dom';
import MyOrders from '../myorders/MyOrders.jsx';
import UserProfile from '../UserProfile/UserProfile';
import ProfileLandingPage from '../ProfileLanding/ProfileLanding.jsx';

const ProfileLayout = () => {

    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state?.user?.user) || { name: "Guest" };
    const [modalLoading, setModalLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState({
        title: "",
        desc: "",
        cancelText: "",
        confirmText: "",
        confirmHandler: () => { }
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
                cancelText: "Stay Login",
                confirmHandler: logoutUser
            }
        ));
        setShowModal(true);
    }

    return (
        <>
            <Modal
                show={showModal}
                confirmText={modalData?.confirmText}
                cancelText={modalData?.cancelText}
                onConfirm={modalData?.confirmHandler}
                loading={modalLoading}
                title={modalData?.title}
                desc={modalData?.desc}
                type="confirm"
                onCancel={closeModal}
            />
            <div className="my-6">
                <ContentWrapper>

                    {
                        loading ? (
                            <Loader styles="h-10 w-10 my-[30vh]" />
                        ) : (
                            <>
                                <div className='flex justify-between items-center mt-10 pb-5 border-b-2 border-gray-300'>
                                    <h1 className='text-black text-2xl font-bold'>Hi, {loggedInUser?.name}</h1>
                                    <button onClick={handleLogOut} className='bg-red-600 text-white p-2 px-8 rounded-lg hover:bg-red-800'>Log Out</button>
                                </div>
                                <Routes>
                                    <Route path="/" element={<ProfileLandingPage />} />
                                    <Route path="/bookings" element={<MyOrders />} />
                                    <Route path="/user" element={<UserProfile />} />
                                </Routes>
                            </>
                        )}
                </ContentWrapper>
            </div>
        </>
    )
}

export default ProfileLayout
