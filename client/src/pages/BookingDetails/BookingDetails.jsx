import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../../components/loader";
import { fetchData, fetchGetData } from "../../lib/fetchData";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import { FaArrowLeft } from "react-icons/fa6";
import Modal from "../../components/modal/Modal";
import { message } from "antd";

const BookingDetails = () => {

    const [members, setMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [booking, setBooking] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookingId = searchParams.get('id');
    const [loading, setLoading] = useState(true);
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

    const getBookingDetails = async () => {
        if (!bookingId) {
            message.warning("Booking Id is required");
            navigate("/profile/bookings");
        }
        const res = await fetchGetData(`/booking/${bookingId}`, setLoading);
        if (!res.success) {
            message.warning(res?.message || "Booking details not found !!");
            navigate("/profile/bookings");
            return;
        }
        setBooking(res?.data[0]);
        setMembers(res?.data[0]?.members);
    }

    const cancelBooking = (booking) => {
        console.log(booking)
        if (booking?.status == "booked") {
            fetchData(`/booking/cancel`, setModalLoading, "DELETE", { bookingId: booking?._id })
                .then(res => {
                    message.success("Booking cancelled successfully!!")
                    getBookingDetails();
                }).catch(err => console.log(err))
                .finally(() => closeModal());
        }
    }

    const handleCancelBooking = () => {
        console.log(booking?.status)
        if (booking?.status !== "booked") return;
        setModalData(() => (
            {
                title: "Are you sure you want to cancel booking?",
                desc: `This action can't be undo . Are you sure you want to cancel your booking for ${booking?.room?.roomName}?`,
                confirmText: "Confirm",
                cancelText: "Back",
                confirmHandler: () => {
                    cancelBooking(booking)
                }
            }
        ));
        setShowModal(true);
    }

    useEffect(() => {

        getBookingDetails();

    }, [bookingId])

    const handleEditMember = (index, field, value) => {
        const updatedMembers = [...members];
        updatedMembers[index][field] = value;
        setMembers(updatedMembers);
    };

    const handleSaveChanges = () => {
        setIsEditing(false);
    };

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
            <div className="min-h-screen bg-gray-50 py-6">
                {
                    loading ?
                        (
                            <Loader styles="h-10 w-10 my-[30vh]" />
                        )
                        :
                        (
                            <ContentWrapper>
                                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Booking Details
                                </h1>

                                <div className="bg-white shadow-lg rounded-lg p-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <button
                                            type="button"
                                            className="text-[--primary-color] hover:text-gray-600 text-2xl font-bold"
                                            onClick={() => navigate("/profile/bookings")}
                                        >
                                            <FaArrowLeft />
                                        </button>

                                        <h2 className="text-2xl font-semibold text-gray-900">{booking?.room?.roomName || "Room"}</h2>
                                    </div>
                                    <img
                                        src={booking?.room?.imageUrl}
                                        alt={booking?.room?.roomName}
                                        className="w-full h-64 rounded-lg object-cover mb-6"
                                    />

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-700">Booking Information</h3>
                                        <p className="text-sm text-gray-500">
                                            Booking ID: <span className="font-medium">{booking?._id}</span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Stay Duration:{" "}
                                            <span className="font-medium">
                                                {booking?.fromDate} to {booking?.toDate}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Total Members: <span className="font-medium">{members?.length}</span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Number of Room(s): <span className="font-medium">{booking?.quantity}</span>
                                        </p>
                                        <p
                                            className={`text-sm font-medium ${booking?.status === "cancelled" ? "text-red-600" : "text-green-600"
                                                }`}
                                        >
                                            Status: {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </p>
                                    </div>

                                    <div className="mb-6">

                                        <h3 className="text-lg font-medium text-gray-700">Payment Details</h3>
                                        <div className="bg-gray-100 p-4 rounded-lg">
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

                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-lg font-medium text-gray-700">Members</h3>
                                        {members?.map((member, index) => (
                                            <div
                                                key={member._id}
                                                className="bg-gray-100 p-4 rounded-lg mb-4 shadow-inner"
                                            >
                                                {isEditing ? (
                                                    <>
                                                        <div className="mb-2">
                                                            <label className="text-sm font-medium text-gray-600">
                                                                Name:
                                                                <input
                                                                    type="text"
                                                                    value={member?.name}
                                                                    onChange={(e) =>
                                                                        handleEditMember(index, "name", e.target.value)
                                                                    }
                                                                    className="block w-full p-2 border rounded-lg mt-1"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div className="mb-2">
                                                            <label className="text-sm font-medium text-gray-600">
                                                                Aadhaar:
                                                                <input
                                                                    type="text"
                                                                    value={member?.adhaar}
                                                                    onChange={(e) =>
                                                                        handleEditMember(index, "adhaar", e.target.value)
                                                                    }
                                                                    className="block w-full p-2 border rounded-lg mt-1"
                                                                />
                                                            </label>
                                                        </div>
                                                        <div>
                                                            <label className="text-sm font-medium text-gray-600">
                                                                Age:
                                                                <input
                                                                    type="number"
                                                                    value={member?.age}
                                                                    onChange={(e) =>
                                                                        handleEditMember(index, "age", e.target.value)
                                                                    }
                                                                    className="block w-full p-2 border rounded-lg mt-1"
                                                                />
                                                            </label>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-sm text-gray-500">
                                                            Name: <span className="font-medium">{member?.name}</span>
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Aadhaar: <span className="font-medium">{member?.adhaar}</span>
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Age: <span className="font-medium">{member?.age}</span>
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {isEditing && (
                                            <button
                                                onClick={handleSaveChanges}
                                                className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-700 focus:ring focus:ring-green-300 transition"
                                            >
                                                Save Changes
                                            </button>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between">
                                        {!isEditing && booking?.status === "booked" && (
                                            <button
                                                onClick={() => setIsEditing(true)}
                                                className="bg-[--primary-color] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-black focus:ring focus:ring-gray-300 transition"
                                            >
                                                Edit Members
                                            </button>
                                        )}
                                        {
                                            booking?.status === "booked" && (
                                                <button
                                                    onClick={handleCancelBooking}
                                                    className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-red-700 focus:ring focus:ring-red-300 transition"
                                                >
                                                    Cancel Booking
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </ContentWrapper>

                        )
                }
            </div>
        </>

    );
};

export default BookingDetails;