import moment from "moment";
import ApiError from "../lib/apiError.js";
import ApiResponse from "../lib/apiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import { getRoomAvailibility } from "../lib/commonFunction.js";
import { roomBookingMail } from "../lib/mailsender.js";
import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import mongoose from "mongoose";
import Customer from "../models/customer.model.js";

export const initiateRoomBooking = asyncHandler(async (req, _, next) => {

    const { room, quantity, from, to, members } = req?.body;

    if (!room || !quantity || !from || !to || !Array.isArray(members)) {
        throw new ApiError(400, "All fields are required !");
    }

    if (quantity < 1 || quantity > members?.length) {
        throw new ApiError(400, "Please provide right number of rooms or members");
    }

    for (let i = 0; i < members?.length; i++) {
        const member = members[i];
        if (!member?.name || !member?.adhaar || !member?.age || isNaN(member?.age)) {
            throw new ApiError(400, "Please provide the details of every member in right formate !!");
        }
    }

    const roomAvailibility = await getRoomAvailibility(room, from, to);

    if (!roomAvailibility || roomAvailibility < quantity) {
        throw new ApiError(400, "Sorry room(s) not available for booking !!");
    }

    const fromdate = moment(from, "DD-MMM-YYYY");
    const todate = moment(to, "DD-MMM-YYYY");
    const totalDays = moment.duration(todate.diff(fromdate)).asDays() + 1;

    const roomDetails = await Room.findOne({ _id: room });

    if (!roomDetails) {
        throw new ApiError(400, "Room not available !");
    }

    const amount = roomDetails?.rent * quantity * totalDays;

    req.body.amount = amount;

    next();

});

export const handleCashBooking = asyncHandler(async (req, _, next) => {

    req.body.paymentMode = "cash";

    next();

});

export const bookRoom = asyncHandler(async (req, res) => {

    const { room: roomId, from: fromDate, to: toDate, quantity: roomQuantity, members, paymentMode, amount } = req?.body;

    console.log(req?.body);

    try {
        if (!roomId || !fromDate || !toDate || !roomQuantity || !Array.isArray(members) || !paymentMode) {
            throw new ApiError(400, "Room booking failed due to incomplete details");
        }

        if (roomQuantity < 1 || roomQuantity > members?.length) {
            throw new ApiError(400, "Room booking failed due to incorrect number of rooms or members");
        }

        let memberIds = [];

        for (let i = 0; i < members?.length; i++) {
            const member = members[i];
            if (!member?.name || !member?.adhaar || !member?.age || isNaN(member?.age)) {
                throw new ApiError(400, "Room booking failed due to invalid member details.");
            }
            const newMember = await Customer.create({
                name: member?.name,
                adhaar: member?.adhaar,
                age: member?.age
            });

            await newMember.save();
            memberIds.push(newMember?._id);
        }

        if (memberIds?.length < members?.length) {
            throw new ApiError(500, "Something went wrong")
        }

        const room = await Room.findOne({
            _id: roomId
        });

        if (!room) {
            throw new ApiError(404, "Sorry room not found !!");
        }

        const roomAvailibility = await getRoomAvailibility(roomId, fromDate, toDate);

        if (roomAvailibility < roomQuantity) {
            throw new ApiError(400, "Sorry room not available !");
        };

        const FromDate = moment(fromDate, 'DD-MMM-YYYY');
        const ToDate = moment(toDate, 'DD-MMM-YYYY');
        const duration = moment.duration(ToDate.diff(FromDate)).asDays() + 1;

        const newBooking = await Booking.create({
            room: roomId,
            user: req?.user?._id,
            fromDate: FromDate?._i,
            toDate: ToDate?._i,
            totalDays: duration,
            totalAmount: req?.payment?.amount || amount,
            payment: req?.payment?.id,
            quantity: roomQuantity,
            paymentMode,
            status: "booked",
            members: memberIds
        });

        await newBooking.save();
        await roomBookingMail(room, req?.user, FromDate, ToDate, newBooking,req?.payment?.amount || amount, members);
        res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    newBooking,
                    "Room booked successfully !!"
                )
            );

    } catch (error) {

        if (req?.body?.paymentMode === "prepaid" && req?.payment?.status === "captured") {
            throw new ApiError(error?.status || error?.statusCode || 400, `${error?.message || "Somthing went wrong"}. If money has been deducted from your account it will be refunded in next 48hrs.`);
        }
        throw new ApiError(error?.status || error?.statusCode || 400, error?.message || "Something went wrong");

    }
});

export const updateMembersInfo = asyncHandler(async (req, res) => {

    const members = req?.body;

    if (!Array.isArray(members) || !members.length) {
        throw new ApiError(400, "Member details are required !!");
    }

    for (let i = 0; i < members?.length; i++) {
        const member = members[i];
        if (!member?._id || !member?.name || !member?.age || !member?.adhaar || isNaN(member?.adhaar) || member?.adhaar?.length !== 12) {
            throw new ApiError(400, "All fields are required and Adhaar number should be 12 digit !!");
        }
        await Customer?.findByIdAndUpdate(
            member?._id,
            {
                $set: {
                    name: member?.name,
                    age: member?.age,
                    adhaar: member?.adhaar
                }
            }
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                [],
                "Member details updated successfully !!"
            )
        );

});

export const getUserBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.aggregate([
        {
            $match: {
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
            $lookup: {
                from: "customers",
                localField: "members",
                foreignField: "_id",
                as: "members",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            age: 1,
                            adhaar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "payments",
                localField: "payment",
                foreignField: "_id",
                as: "payment",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            paymentId: 1,
                            orderId: 1,
                            status: 1,
                            amount: 1,
                            currency: 1,
                            email: 1,
                            contact: 1,
                            refundId: 1,
                            method: 1
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
                quantity: 1,
                refundedAmount: 1,
                paymentMode: 1,
                members: 1,
                room: {
                    $arrayElemAt: ["$room", 0]
                },
                payment: {
                    $arrayElemAt: ["$payment", 0]
                },
                createdAt: 1
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

export const getAllBookings = asyncHandler(async (_, res) => {

    const bookings = await Booking.aggregate([
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
            $lookup: {
                from: "customers",
                localField: "members",
                foreignField: "_id",
                as: "members",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            age: 1,
                            adhaar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "payments",
                localField: "payment",
                foreignField: "_id",
                as: "payment",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            paymentId: 1,
                            orderId: 1,
                            status: 1,
                            amount: 1,
                            method: 1,
                            refundId: 1,
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "bookedBy",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            contactNumber: 1,
                        }
                    }
                ]
            }
        },
        {
            $project: {
                _id: 1,
                room: { $arrayElemAt: ["$room", 0] },
                members: 1,
                payment: { $arrayElemAt: ["$payment", 0] },
                bookedBy: { $arrayElemAt: ["$bookedBy", 0] },
                fromDate: 1,
                toDate: 1,
                totalDays: 1,
                totalAmount: 1,
                paymentMode: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,
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

export const getSpecificBookingDetails = asyncHandler(async (req, res) => {

    const { id } = req?.params;

    if (!id) {
        throw new ApiError(400, "Booking id is required!!");
    }

    const bookings = await Booking.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(id)
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
            $lookup: {
                from: "customers",
                localField: "members",
                foreignField: "_id",
                as: "members",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            age: 1,
                            adhaar: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "payments",
                localField: "payment",
                foreignField: "_id",
                as: "payment",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            paymentId: 1,
                            orderId: 1,
                            status: 1,
                            amount: 1,
                            currency: 1,
                            email: 1,
                            contact: 1,
                            refundId: 1,
                            method: 1
                        }
                    }
                ]
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "bookedBy",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            name: 1,
                            email: 1,
                            contactNumber: 1,
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
                quantity: 1,
                refundedAmount: 1,
                paymentMode: 1,
                members: 1,
                room: {
                    $arrayElemAt: ["$room", 0]
                },
                payment: {
                    $arrayElemAt: ["$payment", 0]
                },
                bookedBy: {
                    $arrayElemAt: ["$bookedBy", 0]
                },
                createdAt: 1
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