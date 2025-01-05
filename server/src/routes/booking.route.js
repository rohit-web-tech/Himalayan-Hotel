import "dotenv/config.js";
import express from 'express'
import {
    bookRoom,
    cancelBooking,
    getAllBookings,
    getSpecificBookingDetails,
    getUserBookings,
    handleCashBooking,
    initiateRoomBooking
} from "../controllers/booking.controller.js"; 
import {adminAuth, auth} from "../middlewares/auth.middleware.js";
import { createPaymentOrder, verifyPayment } from "../controllers/payments.controller.js";
const router = express.Router();

router.route("/")
.get(auth,getUserBookings)

router.route("/:id")
.get(auth,getSpecificBookingDetails)

router.route("/prepaid/paymentOrder")
.post(auth,initiateRoomBooking,createPaymentOrder);

router.route("/prepaid/verify")
.post(auth,verifyPayment,bookRoom);

router.route("/cash")
.post(auth,initiateRoomBooking,handleCashBooking,bookRoom);

router.route("/cancel")
.delete(auth,cancelBooking)

router.route("/all")
.get(auth,adminAuth,getAllBookings);

export default router ;