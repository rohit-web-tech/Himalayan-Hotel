import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom';
import NoData from '../../components/NoData';
import Loader from '../../components/loader';
import { fetchData, fetchGetData } from '../../lib/fetchData';
import { message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/slice/user.slice';
import Modal from '../../components/modal/Modal';

const MyOrders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
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

    const cancelBooking = (booking) => {
        console.log(booking)
        if (booking?.status == "booked") {
            fetchData(`/booking/cancel`, setModalLoading, "DELETE", { bookingId: booking?._id })
                .then(res => {
                    message.success("Booking cancelled successfully!!")
                    getData();
                }).catch(err => console.log(err))
                .finally(()=>closeModal());
        }
    }

    const handleCancelBooking = (booking) => {
        if (booking?.status !== "booked") return;
        setModalData(() => (
            {
                title: "Are you sure you want to cancel booking?",
                desc: `This action can't be undo . Are you sure you want to cancel your booking for ${booking?.room?.roomName}?`,
                confirmText: "Confirm",
                cancelText: "Back",
                confirmHandler : () => { 
                    cancelBooking(booking) 
                }
            }
        ));
        setShowModal(true);
    }

    const TD = ({ label, children, className = "" }) => (
        <td className={`w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static ${className}`}>
            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">{label}</span>
            {children}
        </td>
    )

    const TH = ({ label }) => (
        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">{label}</th>
    )

    const getData = async () => {
        try {
            const res = await fetchGetData(`/booking`, setLoading);
            setBookings(res?.data?.reverse() || []);
        } catch (error) {
            console.log(error);
        }
    }
    console.log(bookings);

    useEffect(() => {
        getData();
    }, [])
    return (
        <ContentWrapper>
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
                        <div className='flex justify-between items-center mt-10 pb-5 border-b-2 border-gray-300'>
                            <h1 className='text-black text-2xl font-bold'>Hi, {loggedInUser?.name}</h1>
                            <button onClick={handleLogOut} className='bg-red-600 text-white p-2 px-8 rounded-lg hover:bg-red-800'>Log Out</button>
                        </div>
                        {
                            bookings?.length < 1 ? (
                                <NoData
                                    title="You don't have any booking yet"
                                    btnText="Book Room Now"
                                    btnHandler={() => navigate("/booking")}
                                />
                            ) : (
                                <>
                                    <h1 className='text-black text-2xl font-bold text-center my-3 pt-3'>My Bookings</h1>
                                    <table className="border-collapse w-full mb-16">
                                        <thead>
                                            <tr>
                                                <TH label="Room Name" />
                                                <TH label="From" />
                                                <TH label="To" />
                                                <TH label="Status" />
                                                <TH label="Actions" />
                                            </tr >
                                        </thead >
                                        <tbody>
                                            {
                                                bookings?.map(booking => {
                                                    return (
                                                        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                                            <TD
                                                                label="Room Name"
                                                            >
                                                                {booking?.room?.roomName}
                                                            </TD>
                                                            <TD
                                                                label="From"
                                                                className='marker:block'
                                                            >
                                                                {booking?.fromDate}
                                                            </TD>
                                                            <TD
                                                                label="To"
                                                            >
                                                                {booking?.toDate}
                                                            </TD>
                                                            <TD
                                                                label="Status"
                                                            >

                                                                <span className={`rounded ${booking?.status == "booked" ? "bg-green-400" : booking?.status == "cancelled" ? "bg-red-400" : "bg-yellow-500"} py-1 px-3 text-xs font-bold`}>{booking?.status}</span>
                                                            </TD>
                                                            <TD
                                                                label="Actions"
                                                            >
                                                                <p className="hover:text-blue-600 hover:cursor-pointer pl-6 text-center underline text-blue-400" onClick={
                                                                    () => {
                                                                        handleCancelBooking(booking);
                                                                    }
                                                                }>{booking.status === "booked" ? "cancel" : "No Action"}</p>
                                                            </TD>
                                                        </tr>
                                                    )
                                                })

                                            }

                                        </tbody>
                                    </table >
                                </>
                            )
                        }
                    </>
                )
            }
        </ContentWrapper >

    )
}

export default MyOrders
