import "dotenv/config.js";
import express from 'express'
import {
    bookRoom,
    cancelBooking,
    getAllBookings,
    getUserBookings
} from "../controllers/booking.controller.js"; 
import {adminAuth, auth} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/")
.get(auth,getUserBookings)
.post(auth,bookRoom)

router.route("/cancel")
.delete(auth,cancelBooking)

router.route("/all")
.get(auth,adminAuth,getAllBookings);

export default router ;