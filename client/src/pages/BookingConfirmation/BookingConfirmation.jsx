import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchGetData } from "../../lib/fetchData";
import { message } from "antd";
import Loader from "../../components/loader";
import { usePDF } from 'react-to-pdf';
import { makeDateTimeReadable } from "../../lib/CommonFunctions";

const BookingConfirmation = () => {

  const [booking, setBooking] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookingId = searchParams.get('id');
  const [loading, setLoading] = useState(true);
  const { toPDF, targetRef } = usePDF({ filename: 'Booking_Confirmation.pdf'});

  const getBookingDetails = async () => {
    const res = await fetchGetData(`/booking/${bookingId}`, setLoading);
    if (!res.success) {
      message.warning(res?.message || "Booking details not found !!");
      navigate("/profile/bookings");
      return;
    }
    setBooking(res?.data[0]);
  }

  useEffect(() => {

    if (!bookingId) {
      message.warning("Booking Id is required");
      navigate("/profile/booking");
    }

    getBookingDetails();

  }, [bookingId]);

  return (
    <div className=" bg-gray-50 flex items-center justify-center px-4 my-4">
      {
        loading ?
          (
            <Loader styles="h-10 w-10 my-[30vh]" />
          )
          :
          (
            <div
              className="bg-white shadow-lg rounded-lg w-full max-w-3xl relative"
            >
              <div
                className="w-full p-6 flex flex-col gap-2"
                ref={targetRef}
              >
                <h1 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                  Booking Confirmation
                </h1>
                <div className="space-y-4">
                  {/* Room Details */}
                  <div className="flex flex-col md:flex-row items-center">
                    <img
                      src={booking?.room?.imageUrl}
                      alt={booking?.room?.roomName}
                      className="w-full md:w-32 h-32 rounded-lg object-cover"
                    />
                    <div className="mt-4 md:mt-0 md:ml-4 text-center md:text-left">
                      <h2 className="text-lg font-semibold text-gray-700">
                        {booking?.room?.roomName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Booking ID: <span className="font-medium">{booking?._id}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Number of Room(s): <span className="font-medium">{booking?.quantity}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Stay:{" "}
                        <span className="font-medium">
                          {booking?.fromDate} - {booking?.toDate}
                        </span>
                      </p>
                      <p className="text-sm text-gray-500">
                        Booked On: <span className="font-medium">{makeDateTimeReadable(booking?.createdAt)}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Guest Details */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700">Member Details</h3>
                  <ul className="mt-2 space-y-2">
                    {booking?.members?.map((member) => (
                      <li
                        key={member?._id}
                        className="flex flex-col md:flex-row justify-between items-center text-sm"
                      >
                        <span className="font-medium">{member?.name}</span>
                        <span className="text-gray-500">
                          Age: {member?.age} | Aadhaar: {member?.adhaar}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-700">Payment Details</h3>
                  <p className="text-sm text-gray-500">
                    Payment Mode:{" "}
                    <span className="font-medium text-gray-800">{booking?.paymentMode}</span>
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
                    <span className="font-medium text-gray-800">
                      ₹{booking?.paymentMode === "cash" ? booking?.totalAmount.toFixed(2) : (booking?.payment?.amount / 100).toFixed(2)}
                    </span>
                  </p>
                </div>

                {/* Booking Status */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Booking Status</h3>
                  <p
                    className={`mt-1 text-sm font-medium ${booking?.status === "cancelled" ? "text-red-600" : "text-green-600"
                      }`}
                  >
                    {booking?.status?.charAt(0).toUpperCase() + booking?.status?.slice(1)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-col px-6 pb-6 sm:flex-row">

                {/* Go to Booking Button */}
                <button
                  className="w-full min-w-10 bg-[--primary-color] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black focus:ring focus:ring-blue-300 transition"
                  onClick={toPDF}
                >
                  Download Anknowledgement
                </button>
                <button
                  className="w-full min-w-10 bg-[--primary-color] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black focus:ring focus:ring-blue-300 transition"
                  onClick={() => { navigate("/profile/bookings") }}
                >
                  Go to My Bookings
                </button>
              </div>
            </div>
          )
      }
    </div>
  );
};


export default BookingConfirmation;