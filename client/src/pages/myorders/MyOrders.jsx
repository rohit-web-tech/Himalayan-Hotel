import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom';
import NoData from '../../components/NoData';
import Loader from '../../components/loader';
import { fetchData } from '../../lib/fetchData';
import { message } from 'antd';

const MyOrders = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const user = localStorage.getItem("akhoteluser");
    const [loading, setLoading] = useState(true)
    const loggedInUser = user ? JSON.parse(user) : { userName: "Guest" };

    const handleLogOut = () => {
        if (!confirm("Are you sure, you want to log out ?")) return;
        localStorage.removeItem("akhoteluser");
        navigate("/login");
    }

    const getData = async () => {
        try {
            const res = await fetchData(`/getUserBookings`, setLoading, "POST", { userId: loggedInUser?._id });
            setBookings(res?.bookings?.reverse() || []);
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
                        <div className='flex justify-between items-center mt-10 pb-5 border-b-2 border-gray-300'>
                            <h1 className='text-black text-2xl font-bold'>Hi, {loggedInUser?.userName}</h1>
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
                                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Room name</th>
                                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">From</th>
                                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">To</th>
                                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Status</th>
                                                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th>
                                            </tr >
                                        </thead >
                                        <tbody>
                                            {
                                                bookings?.map(booking => {
                                                    return (
                                                        <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Room NAme</span>
                                                                {booking?.roomName}
                                                            </td>
                                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b marker:block lg:table-cell relative lg:static">
                                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">From</span>
                                                                {booking?.fromDate}
                                                            </td>
                                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">To</span>
                                                                {booking?.toDate}
                                                            </td>
                                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Status</span>
                                                                <span className={`rounded ${booking?.status == "booked" ? "bg-green-400" : booking?.status == "cancelled" ? "bg-red-400" : "bg-yellow-500"} py-1 px-3 text-xs font-bold`}>{booking?.status}</span>
                                                            </td>
                                                            <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                                                                <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                                                                <p className="hover:text-blue-600 hover:cursor-pointer pl-6 text-center underline text-blue-400" onClick={() => {
                                                                    if (booking?.status == "booked") {
                                                                        fetchData(`/cancelBooking`, () => { }, "POST", { bookingId: booking?._id })
                                                                            .then(res => {
                                                                                message.success("Booking cancelled successfully!!")
                                                                                setBookings(res?.reverse());
                                                                            }).catch(err => console.log(err))
                                                                    }
                                                                }}>{booking.status === "booked" ? "cancel" : "No Action"}</p>
                                                            </td>
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
