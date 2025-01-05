import React, { useEffect, useState } from "react";
import { MdOutlinePayment, MdOutlineAttachMoney } from "react-icons/md";
import moment from "moment";
import Loader from "./loader";
import ContentWrapper from "./contentWrapper/ContentWrapper";
import { FaArrowLeft } from "react-icons/fa6";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import { fetchData, fetchGetData } from "../lib/fetchData";

const RoomBookingPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromDate = searchParams.get('from');
  const toDate = searchParams.get('to');
  const [numRooms, setNumRooms] = useState(1);
  const [numMembers, setNumMembers] = useState(1);
  const [members, setMembers] = useState([{ name: "", age: "", adhaar: "" }]);
  const [paymentMode, setPaymentMode] = useState("Online");
  const fromdate = moment(fromDate, "DD-MMM-YYYY");
  const todate = moment(toDate, "DD-MMM-YYYY");
  const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;
  const [loading, setLoading] = useState(true);
  const [room, setRoom] = useState({});

  const fetchRoomDetails = async () => {
    const res = await fetchGetData(`/room/${id}`, setLoading);
    if (res?.success) {
      setRoom(res?.data);
      return;
    }
    message.warning("Invalid room Id !!");
    navigate("/booking");
  };

  useEffect(() => {
    if (!id || !fromDate || !toDate) {
      message.warning("Room id, from and to date are required");
      navigate("/booking");
      return;
    }
    fetchRoomDetails();
  }, [id, fromDate, toDate, navigate]);

  const calculateTotalAmount = () => numRooms * totalDays * (room?.rent || 0);

  const updateMembersArray = (newNumMembers) => {
    const updatedMembers = Array.from({ length: newNumMembers }, (_, index) => ({
      ...members[index],
    }));
    setMembers(updatedMembers);
  };

  const handleNumRoomsChange = (increment) => {
    const newNumRooms = increment ? numRooms + 1 : Math.max(1, numRooms - 1);
    setNumRooms(newNumRooms);
    if (newNumRooms > numMembers) {
      setNumMembers(newNumRooms);
      updateMembersArray(newNumRooms);
    }
  };

  const handleNumMembersChange = (increment) => {
    const newNumMembers = increment ? numMembers + 1 : Math.max(numRooms, numMembers - 1);
    setNumMembers(newNumMembers);
    updateMembersArray(newNumMembers);
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const handlePrepaidRoomBooking = async () => {
    const res = await fetchData("/booking/prepaid/paymentOrder", setLoading, "POST", { from: fromDate, to: toDate, room: id, quantity: Number(numRooms), members, currency: "INR" });
    if (res?.success) {
      const { key_id, amount, currency, email, contact, name, id: orderId } = res?.data;
      if (!key_id || !amount || !currency || !email || !contact || !name || !orderId) {
        return message.error("Failed to create payment order");
      }
      var options = {
        "key": key_id,
        "amount": amount,
        "currency": currency,
        "name": "Himalayan Hotel",
        "description": "Room booking payment",
        "order_id": orderId,
        "prefill": {
          "name": name,
          "email": email,
          "contact": contact
        },
        "handler": async function (response) {
          const res = await fetchData('/booking/prepaid/verify', () => { }, "POST", { response, from: fromDate, to: toDate, room: id, quantity: Number(numRooms), members });
          if (res?.success) {
            message.success("Room booked successfully!!");
            navigate(`/booking/confirmation?id=${res?.data?._id}`);
          } else {
            message.warning(res?.message || "Room booking error!!");
          }
        },
        "notes": {
          "address": "The Himalayan Hotel"
        },
        "theme": {
          "color": "#111827"
        }
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert("failed", response);
      });
      rzp1.open();
      e.preventDefault();
    } else {
      message.warning(res?.message || "Room booking error!!");
    }
  }

  const handlePostPaidRoomBooking = async () => {
    const res = await fetchData("/booking/cash", setLoading, "POST", { from: fromDate, to: toDate, room: id, quantity: Number(numRooms), members });
    if (res?.success) {
      message.success("Room booked successfully!!");
      navigate(`/booking/confirmation?id=${res?.data?._id}`);
    } else {
      message.warning(res?.message || "Room booking error!!");
    }
  }

  const handleRoomBooking = () => {

    if (!id || !members || !Array?.isArray(members) || isNaN(numMembers) || isNaN(numRooms) || !toDate || !fromDate) {
      return message.warning("All fields are required !!");
    }

    if (numRooms < 1 || numMembers < numRooms) {
      return message.warning("Invalid room or member numbers !!")
    }

    for (let i = 0; i < members?.length; i++) {
      const member = members[i];
      if (!member?.adhaar || member?.adhaar?.length !== 12 || !member?.name || !member?.age || isNaN(member?.age)) {
        return message.warning("Please provide all members details and in proper formate !!");
      }
    }

    if (paymentMode === "Online") {
      handlePrepaidRoomBooking();
    } else {
      handlePostPaidRoomBooking();
    }
  }

  return (
    <div className="relative w-full flex bg-white overflow-auto py-5">
      {
        loading ?
          (
            <Loader styles="h-10 w-10 my-[30vh]" />
          )
          :
          (
            <ContentWrapper>
              <div className="w-full h-full flex flex-col md:flex-row gap-8 bg-white rounded-lg">
                {/* Left Side: Room Details */}
                <div className="w-full md:w-1/2 flex flex-col gap-2 py-4 md:py-5">
                  <div className="flex items-center gap-4 mb-4">
                    <button
                      type="button"
                      className="text-[--primary-color] hover:text-gray-600 text-2xl font-bold"
                      onClick={() => navigate("/booking")}
                    >
                      <FaArrowLeft />
                    </button>

                    <h2 className="text-2xl font-semibold text-gray-900">Room Booking Details</h2>
                  </div>

                  {/* Room Image and Information */}
                  <div className="mb-4">
                    <img
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/b4/93/9d/panoramic-room.jpg?w=1200&h=-1&s=1"
                      alt="Premium Room"
                      className="object-cover w-full h-60 rounded-lg"
                    />
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900">{room?.roomName || "Room"}</h3>

                  {/* Room Rent and Dates */}
                  <p className="text-gray-700 text-sm">Rent per Night: ₹{room?.rent || 0}</p>
                  <p className="text-gray-700 text-sm">From: {fromDate}</p>
                  <p className="text-gray-700 text-sm">To: {toDate}</p>

                  <div className="mt-2">
                    <h4 className="text-lg font-semibold">Total Days: {totalDays}</h4>
                    <h4 className="text-lg font-semibold">Total Rent: ₹{calculateTotalAmount()}</h4>
                  </div>
                </div>

                {/* Right Side: Booking Form and Payment Modes */}
                <div className="w-full md:w-1/2 flex flex-col gap-6">
                  <div className="bg-white md:py-6 py-4">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-900">Booking Form</h2>

                    <div className="flex items-center gap-10 mb-3">

                      {/* Number of Rooms */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rooms</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleNumRoomsChange(false)}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-[--secondary-color]"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-gray-700">{numRooms}</span>
                          <button
                            onClick={() => handleNumRoomsChange(true)}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-[--secondary-color]"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Number of Members */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Number of Members</label>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleNumMembersChange(false)}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-[--secondary-color]"
                          >
                            -
                          </button>
                          <span className="text-sm font-medium text-gray-700">{numMembers}</span>
                          <button
                            onClick={() => handleNumMembersChange(true)}
                            className="px-3 py-1 bg-gray-200 rounded-md hover:bg-[--secondary-color]"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>


                    {/* Member Details */}
                    <h3 className="font-semibold text-sm bg-white translate-y-1/2 z-50 inline-block ml-1 text-gray-500">Member Details</h3>
                    <div className="mb-4 max-h-40 overflow-y-auto border-2 rounded-sm px-1 py-2">
                      {members.map((member, index) => (
                        <div key={index} className="mb-3">
                          <h3 className="font-semibold text-gray-700 mb-1">Member {index + 1}</h3>
                          <div className="flex gap-4">
                            <input
                              type="text"
                              placeholder="Name"
                              value={member?.name}
                              onChange={(e) => handleMemberChange(index, "name", e.target.value)}
                              className="w-1/3 border-2 rounded-sm px-2 py-2 text-base"
                            />
                            <input
                              type="number"
                              placeholder="Age"
                              value={member?.age}
                              onChange={(e) => handleMemberChange(index, "age", e.target.value)}
                              className="w-1/3 border-2 rounded-sm px-2 py-2 text-base"
                            />
                            <input
                              type="text"
                              placeholder="Aadhaar"
                              value={member?.adhaar}
                              onChange={(e) => handleMemberChange(index, "adhaar", e.target.value)}
                              className="w-1/3 border-2 rounded-sm px-2 py-2 text-base"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Payment Mode */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                      <div className="flex items-center gap-4">
                        <div
                          onClick={() => setPaymentMode("Online")}
                          className={`cursor-pointer px-6 py-2 rounded-lg flex items-center gap-2 ${paymentMode === "Online"
                            ? "bg-[--primary-color] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-[--secondary-color]"
                            }`}
                        >
                          <MdOutlinePayment className="text-lg" />
                          Online
                        </div>
                        <div
                          onClick={() => setPaymentMode("Cash")}
                          className={`cursor-pointer px-6 py-2 rounded-lg flex items-center gap-2 ${paymentMode === "Cash"
                            ? "bg-[--primary-color] text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-[--secondary-color]"
                            }`}
                        >
                          <MdOutlineAttachMoney className="text-lg" />
                          Cash on Check-In
                        </div>
                      </div>
                    </div>

                    {/* Total Payable Amount */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold">Total Payable Amount</h4>
                      <p className="text-sm text-gray-800">₹{calculateTotalAmount()}</p>
                    </div>

                    {/* Book Now Button */}
                    <button
                      onClick={handleRoomBooking}
                      className={`mt-6 flex w-full items-center justify-center rounded-md border px-8 py-3 text-base font-medium text-white ${!false ? "bg-[--primary-color]" : "bg-slate-300"
                        }`}
                    >
                      {false ? <Loader className="h-4 w-4" /> : "Book Now!"}
                    </button>
                  </div>
                </div>
              </div>
            </ContentWrapper>
          )
      }
    </div>
  );
};

export default RoomBookingPage;