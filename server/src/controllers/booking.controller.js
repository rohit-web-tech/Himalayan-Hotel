import moment from "moment";
import ApiError from "../lib/apiError.js";
import ApiResponse from "../lib/apiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { getRoomAvailibility } from "../lib/commonFunction.js";
import { roomBookingMail } from "../lib/mailsender.js";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import mongoose from "mongoose";

export const bookRoom = asyncHandler(async (req, res) => {

    const { roomId, fromDate, toDate } = req?.body;

    if (!roomId || !fromDate || !toDate) {
        throw new ApiError(400, "All fields are required !!");
    }

    const room = await Room.findOne({
        _id: roomId
    });

    if (!room) {
        throw new ApiError(404, "Room not found !!");
    }

    const roomAvailibility = await getRoomAvailibility(roomId, fromDate, toDate);

    if (roomAvailibility < 1) {
        throw new ApiError(400, "Room not available !!");
    }

    const FromDate = moment(fromDate, 'DD-MMM-YYYY');
    const ToDate = moment(toDate, 'DD-MMM-YYYY');
    const duration = moment.duration(ToDate.diff(FromDate)).asDays() + 1;
    const totalAmount = room.rent * duration;

    const newBooking = await Booking.create({
        room: roomId,
        user: req?.user?._id,
        fromDate: FromDate?._i,
        toDate: ToDate?._i,
        totalDays: duration,
        totalAmount
    });

    await newBooking.save();
    await roomBookingMail(room?.roomName, req?.user, FromDate, ToDate);

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                [],
                "Room booked successfully !!"
            )
        );

});

export const getUserBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.aggregate([
        {
            $match : {
                user: mongoose.Types.ObjectId(req?.user?._id)
            }
        },
        {
            $lookup: {
                from: "rooms",
                localField: "room",
                foreignField: "_id",
                as: "room",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            roomName: 1,
                            imageUrl: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                fromDate: 1,
                toDate: 1,
                totaldays: 1,
                totalAmount: 1,
                status: 1,
                room: {
                    $arrayElemAt: ["$room", 0]
                }
            }
        }
    ]);

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                bookings,
                "Bookings retrieved successfully !!"
            )
        );

});

export const cancelBooking = asyncHandler(async (req, res) => {

    const { bookingId } = req.body;

    if (!bookingId) {
        throw new ApiError(400, "BookingId is required !!");
    }

    const booking = await Booking.findOneAndUpdate(
        {
            _id: bookingId,
            user: req?.user?._id
        },
        {
            $set: {
                status: "cancelled"
            }
        },
        {
            new: true
        }
    );

    if (!booking) {
        throw new ApiError(400, "Unauthorized cancellation request !!");
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                booking,
                "Booking cancelled successfully !!"
            )
        );

});

export const getAllBookings = asyncHandler(async(req,res)=>{

    const bookings = await Booking.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1 ,
                            contactNumber : 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "rooms",
                localField: "room",
                foreignField: "_id",
                as: "room",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            roomName: 1,
                            imageUrl: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                fromDate: 1,
                toDate: 1,
                totalDays: 1,
                totalAmount: 1,
                status: 1,
                room: {
                    $arrayElemAt: ["$room", 0]
                },
                user: {
                    $arrayElemAt: ["$user", 0]
                }
            }
        }
    ]);

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                bookings,
                "Bookings retrieved successfully !!"
            )
        );

})