import { useState, useEffect } from "react";
import { ArrowLeft, KeyRound, Loader as Loader2 } from "lucide-react";
import Wrapper from "../components/Wrapper";
import Loader from "../components/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, fetchGetData } from "../lib/fetchData";
import { message } from "antd";
import { useGlobalContext } from "../contexts/GlobalContext";

const OtpComponent = ({ onVerify, loading }: { onVerify: (otp: string) => void; loading: boolean }) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(120);
  const { themeColor } = useGlobalContext();

  useEffect(() => {
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = () => {
    if (otp.length === 6) {
      onVerify(otp);
    }
  };

  return (
    <div className="mt-6 bg-secondary-bg p-6 rounded-lg shadow-md border border-hover">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-secondary-text">
        <KeyRound className="w-5 h-5" /> OTP Verification
      </h3>
      <input
        type="text"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="border border-hover text-secondary-text p-3 text-center w-full rounded text-xl tracking-widest outline-none mb-4"
        placeholder="______"
      />
      <div className="flex items-center justify-between">
        <button
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
          className="text-white px-4 py-2 rounded disabled:opacity-50"
          style={{
            background: themeColor
          }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
        </button>
        <button
          className="text-sm text-gray disabled:opacity-40"
          disabled={resendTimer > 0}
        >
          Resend OTP {resendTimer > 0 && `in ${resendTimer}s`}
        </button>
      </div>
    </div>
  );
};

const BookingDetails = () => {
  const SERVER_URL = import.meta.env.VITE_BASE_URL;
  const [action, setAction] = useState<"checkin" | "checkout" | null>(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get('id');

  const handleAction = async (type: "checkin" | "checkout") => {
    if (type === "checkin") {
      const res = await fetchGetData(`/booking/checkin/${bookingId}`, setLoading);
      if (res?.success) {
        setAction(type);
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    } else {
      const res = await fetchGetData(`/booking/checkout/${bookingId}`, setLoading);
      if (res?.success) {
        setAction(type);
        message.success(res?.message);
      } else {
        message.error(res?.message);
      }
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    if (action === "checkin") {
      const res = await fetchData("/booking/checkin", setLoading, "POST", { id: bookingId, otp });
      if (res?.success) {
        message.success(res?.message);
        setAction(null);
        getBookingDetails();
      } else {
        message.error(res?.message);
      }
    } else {
      const res = await fetchData("/booking/checkout", setLoading, "POST", { id: bookingId, otp });
      if (res?.success) {
        message.success(res?.message);
        setAction(null);
        getBookingDetails();
      } else {
        message.error(res?.message);
      }
    }
  };


  const getBookingDetails = async () => {
    if (!bookingId) {
      message.warning("Booking Id is required");
      navigate("/bookings");
    }
    const res = await fetchGetData(`/booking/${bookingId}`, setPageLoading);
    if (!res.success) {
      message.warning(res?.message || "Booking details not found !!");
      navigate("/profile/bookings");
      return;
    }
    setBooking(res?.data[0]);
  }

  useEffect(() => {
    getBookingDetails();
  }, [])

  return (
    <Wrapper
      className="px-3 py-5"
    >
      {
        pageLoading ?
          (
            <Loader text="Loading booking details..." />
          )
          :
          (
            <>

              <div className="bg-main-bg shadow-lg rounded-lg p-6">
                <div className="flex items-center gap-4 mb-4">
                  <button
                    type="button"
                    className="text-gray hover:opacity-90 text-2xl font-bold"
                    onClick={() => navigate("/bookings")}
                  >
                    <ArrowLeft />
                  </button>

                  <h2 className="text-2xl font-semibold text-main-text">{booking?.room?.roomName || "Room"}</h2>
                </div>
                <img
                  src={SERVER_URL + booking?.room?.imageUrl}
                  alt={booking?.room?.roomName}
                  className="w-full h-64 rounded-lg object-cover mb-6"
                />

                <div className="mb-6 space-y-2">
                  <h3 className="text-lg font-semibold text-main-text">Booking Information</h3>
                  <p className="text-sm text-secondary-text">
                    Booking ID: <span className="font-semibold">{booking?._id}</span>
                  </p>
                  <p className="text-sm text-secondary-text">
                    Stay Duration:{" "}
                    <span className="font-semibold">
                      {booking?.fromDate} to {booking?.toDate}
                    </span>
                  </p>
                  <p className="text-sm text-secondary-text">
                    Total Members: <span className="font-semibold">{booking?.members?.length}</span>
                  </p>
                  <p className="text-sm text-secondary-text">
                    Number of Room(s): <span className="font-semibold">{booking?.quantity}</span>
                  </p>

                  <p className="text-sm text-secondary-text">
                    Booked On:{" "}
                    <span className="font-semibold">{booking?.createdAt}</span>
                  </p>
                  <p
                    className={`text-sm font-semibold ${booking?.status === "Cancelled" ? "text-red-600" : booking?.status === "Booked" ? "text-green-600" : booking?.status === "Checked In" ? "text-yellow-600" : "text-orange-600"
                      }`}
                  >
                    Status: {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
                  </p>
                </div>

                <div className="mb-6">

                  <h3 className="text-lg font-semibold text-main-text mb-2">Payment Details</h3>
                  <div className="bg-secondary-bg space-y-2 p-4 rounded-lg">
                    <p className="text-sm text-secondary-text">
                      Payment Mode:{" "}
                      <span className="font-semibold text-secondary-text">{booking?.paymentMode}</span>
                    </p>
                    {booking?.payment && (
                      <>
                        <p className="text-sm text-secondary-text">
                          Payment Status:{" "}
                          <span
                            className={`font-semibold ${booking?.payment?.status === "captured"
                              ? "text-green-600"
                              : "text-red-600"
                              }`}
                          >
                            {booking?.payment?.status}
                          </span>
                        </p>
                        <p className="text-sm text-secondary-text">
                          Payment ID:{" "}
                          <span className="font-semibold">{booking?.payment?.paymentId}</span>
                        </p>
                        <p className="text-sm text-secondary-text">
                          Done By:{" "}
                          <span className="font-semibold">{booking?.payment?.method}</span>
                        </p>
                      </>
                    )}
                    <p className="text-sm text-secondary-text">
                      Total Amount:{" "}
                      <span className="font-semibold text-secondary-text">
                        ₹{booking?.paymentMode === "cash" ? booking?.totalAmount.toFixed(2) : (booking?.payment?.amount / 100).toFixed(2)}
                      </span>
                    </p>
                  </div>

                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-main-text mb-2">Members</h3>
                  {booking?.members?.map((member: any) => (
                    <div
                      key={member._id}
                      className="bg-secondary-bg p-4 rounded-lg mb-4 shadow-inner space-y-2"
                    >
                      <p className="text-sm text-secondary-text">
                        Name: <span className="font-semibold">{member?.name}</span>
                      </p>
                      <p className="text-sm text-secondary-text">
                        Aadhaar: <span className="font-semibold">{member?.adhaar}</span>
                      </p>
                      <p className="text-sm text-secondary-text">
                        Age: <span className="font-semibold">{member?.age}</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">

                  <h3 className="text-lg font-semibold text-main-text mb-2">Booker's Details</h3>
                  <div className="bg-secondary-bg space-y-2 p-4 rounded-lg">
                    <p className="text-sm text-secondary-text">
                      Name:{" "}
                      <span className="font-semibold">{booking?.bookedBy?.name}</span>
                    </p>
                    <p className="text-sm text-secondary-text">
                      Email:{" "}
                      <span className="font-semibold">{booking?.bookedBy?.email}</span>
                    </p>
                    <p className="text-sm text-secondary-text">
                      Contact Number:{" "}
                      <span className="font-semibold">{booking?.bookedBy?.contactNumber}</span>
                    </p>
                  </div>

                </div>

                <div className="flex items-center justify-between">
                  {
                    !action && booking?.status === "Booked" && (
                      <>
                        <button
                          onClick={() => handleAction("checkin")}
                          className="bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-green-700 focus:ring focus:ring-green-300 transition"
                        >
                          Check In
                        </button>
                        <button
                          onClick={() => { }}
                          className="bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-red-700 focus:ring focus:ring-red-300 transition"
                        >
                          Cancel Booking
                        </button>
                      </>

                    )
                  }
                  {
                    !action && booking?.status === "Checked In" && (
                      <>
                        <button
                          onClick={() => handleAction("checkout")}
                          className="bg-orange-600 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:bg-orange-700 focus:ring focus:ring-green-300 transition"
                        >
                          Check Out
                        </button>
                      </>
                    )
                  }
                </div>

                {action &&
                  <OtpComponent
                    loading={loading}
                    onVerify={handleVerifyOtp}
                  />
                }

              </div>
            </>
          )
      }
    </Wrapper >

  );
};

export default BookingDetails;
