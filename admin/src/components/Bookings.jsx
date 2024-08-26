import { useEffect, useState } from 'react'
import Table, { TD, TR } from './Table'
import Loader from './loader';
import NoData from './NoData';

const Bookings = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBookings = async () => {
        setLoading(true)
        fetch(`${BASE_URL}/allBookings`)
            .then(res => res.json())
            .then(res => {
                setBookings(res?.bookings)
            }).catch(err => console.log(err))
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getBookings();
    }, [])

    const tableFeilds = [
        "#",
        "Room",
        "RoomName",
        "RoomNumber",
        "Rent",
        "From",
        "To",
        "TotalDays",
        "CustomerName",
        "CustomerEmail",
        "Status",
    ]

    const rowData = () => {
        return bookings?.map((booking, i) => (
            <TR key={booking.id}>
                <TD>{i + 1}</TD>
                <TD><img src={booking?.imageUrl || ""} alt="" className='h-6 w-14' /></TD>
                <TD>{booking?.roomName || "1"}</TD>
                <TD>{booking?.room_id || "1"}</TD>
                <TD>{booking?.totalAmount || "00"}</TD>
                <TD>{booking?.fromDate || "00"}</TD>
                <TD>{booking?.toDate || "00"}</TD>
                <TD>{booking?.totalDays || "00"}</TD>
                <TD>{booking?.userName || "00"}</TD>
                <TD>{booking?.userEmail || "00"}</TD>
                <TD>{booking?.status == "booked" ? (
                    <span className="bg-green-500 text-white p-2 rounded-md text-xs">Booked</span>
                ) : booking?.status == "cancelled" ? (
                    <span className="bg-red-500 text-white p-2 rounded-md text-xs">Cancelled</span>
                ) : (
                    <span className="bg-yellow-500 text-white p-2 rounded-md text-xs">Checked Out</span>
                )}</TD>
            </TR>
        ))
    }

    return (
        <div className='flex flex-col  w-full md:w-[calc(100%-300px)] sm:px-14 px-6 py-3'>
            {
                loading ? (
                    <Loader styles="h-10 w-10 my-[calc(50vh-40px)]" />
                ) :
                    bookings?.length < 1 ? (
                        <div className='h-screen flex justify-center items-center'>
                            <NoData
                                title='No Booking Data found !!'
                            />
                        </div>
                    ) : (
                        <>
                            <h2 className='text-gray-900 font-bold text-xl h-[70px] flex items-center'>Bookings</h2>
                            <Table tableFields={tableFeilds} tableRows={rowData} />
                        </>
                    )
            }
        </div >
    )
}

export default Bookings