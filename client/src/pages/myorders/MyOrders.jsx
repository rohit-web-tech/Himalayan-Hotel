import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/loader';
import { fetchGetData } from '../../lib/fetchData';
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/slice/user.slice';
import Modal from '../../components/modal/Modal';
import { FaArrowLeft } from 'react-icons/fa6';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true)
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

    const getData = async () => {
        try {
            const res = await fetchGetData(`/booking`, setLoading);
            setBookings(res?.data?.reverse() || []);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [])
    return (
        <div className="my-6 p-3 bg-gray-100 ">
            {
                loading ? (
                    <Loader styles="h-10 w-10 my-[30vh]" />
                ) : (
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
                        <div className="flex items-center justify-center gap-4 mb-4 w-full relative">
                                        <button
                                            type="button"
                                            className="absolute left-0 text-[--primary-color] hover:text-gray-600 text-2xl font-bold"
                                            onClick={() => navigate("/profile")}
                                        >
                                            <FaArrowLeft />
                                        </button>

                                        <h2 className="text-2xl font-semibold text-gray-900">My Bookings</h2>
                                    </div>
                        <div className="space-y-6">
                            {bookings?.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition"
                                >
                                    <div className="flex flex-col md:flex-row items-start md:items-center">
                                        <img
                                            src={booking?.room?.imageUrl}
                                            alt={booking?.room?.roomName}
                                            className="w-full md:w-32 h-32 rounded-lg object-cover"
                                        />
                                        <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                                            <h2 className="text-lg font-semibold text-gray-700">
                                                {booking?.room?.roomName}
                                            </h2>
                                            <p className="text-sm text-gray-500">
                                                Booking ID:{" "}
                                                <span className="font-medium">{booking?._id}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Stay:{" "}
                                                <span className="font-medium">
                                                    {booking?.fromDate} - {booking?.toDate}
                                                </span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Total Members:{" "}
                                                <span className="font-medium">{booking?.members?.length}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Number of room(s):{" "}
                                                <span className="font-medium">{booking?.quantity}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                        <h3 className="text-lg font-medium text-gray-700">Payment Details</h3>
                                        <p className="text-sm text-gray-500">
                                            Payment Mode:{" "}
                                            <span className="font-medium">{booking?.paymentMode}</span>
                                        </p>
                                        {booking?.payment && (
                                            <>
                                                <p className="text-sm text-gray-500">
                                                    Payment Status:{" "}
                                                    <span
                                                        className={`font-medium ${booking?.payment?.status === "captured"
                                                                ? "text-green-600"
                                                                : "text-red-600"
                                                            }`}
                                                    >
                                                        {booking?.payment?.status}
                                                    </span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Payment ID:{" "}
                                                    <span className="font-medium">{booking?.payment?.paymentId}</span>
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Done By:{" "}
                                                    <span className="font-medium">{booking?.payment?.method}</span>
                                                </p>
                                            </>
                                        )}
                                        <p className="text-sm text-gray-500">
                                            Total Amount:{" "}
                                            <span className="font-medium">
                                                ₹{booking?.paymentMode === "cash" ? (booking?.totalAmount).toFixed(2) : (booking?.payment?.amount / 100).toFixed(2)}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mt-4 flex items-center justify-between">
                                        <p
                                            className={`text-sm font-medium ${booking?.status === "cancelled"
                                                    ? "text-red-600"
                                                    : "text-green-600"
                                                }`}
                                        >
                                            Status:{" "}
                                            {booking?.status?.charAt(0)?.toUpperCase() + booking?.status.slice(1)}
                                        </p>
                                        <button
                                            className="bg-[--primary-color] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black focus:ring focus:ring-gray-300 transition"
                                            onClick={() => navigate(`/mybooking?id=${booking?._id}`)}
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default MyOrders
