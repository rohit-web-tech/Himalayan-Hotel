import ApiError from "../lib/apiError.js";
import ApiResponse from "../lib/apiResponse.js";
import asyncHandler from "../lib/asyncHandler.js";
import Room from "../models/room.model.js";
import { getRoomAvailibility } from "../lib/commonFunction.js";

export const getRooms = asyncHandler(async (req, res) => {

    const rooms = await Room.find({});

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                rooms,
                "Rooms fetched successfully !!"
            )
        );

});

export const addRoom = asyncHandler(async (req, res) => {

    const { roomName, rent, imageUrl, totalRooms } = req.body;

    if (!roomName || !rent || !imageUrl || !totalRooms) {
        throw new ApiError(400, "All feilds are required!!");
    }

    const newRoom = await Room.create({
        roomName,
        rent,
        imageUrl,
        totalRooms
    });

    await newRoom.save();

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {},
                "Room added successfully !!"
            )
        );

});

export const editRoom = asyncHandler(async (req, res) => {

    const { _id, roomName, rent, imageUrl, totalRooms } = req.body;

    if (!roomName || !rent || !imageUrl || !totalRooms || !_id) {
        throw new ApiError(400, "All feilds are required!!");
    }

    await Room.findByIdAndUpdate(
        _id,
        {
            $set: {
                roomName,
                rent,
                imageUrl,
                totalRooms
            }
        }
    );

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Room details edited successfully !!"
            )
        );

});

export const deleteRoom = asyncHandler(async (req, res) => {

    const { roomId } = req.body;

    if (!roomId) {
        throw new ApiError(400, "Room Id is required !!");
    }

    await Room.findByIdAndDelete(
        roomId
    );

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Room deleted successfully !!"
            )
        );

});

export const getRoomDetails = asyncHandler(async (req, res) => {

    const { id } = req.param;

    if (!id) {
        throw new ApiError(400, "Room id is required !!");
    }

    const room = await Room.findOne({
        _id: id
    });

    if (!room) {
        throw new ApiError(400, "No room found !!");
    }

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                room,
                "Room details fetched successfully !!"
            )
        );

});

export const filterRoomsByDates = asyncHandler(async (req, res) => {

    const { fromDate, toDate } = req.body;
    const rooms = await Room.find({});

    if (!fromDate || !toDate) {
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    rooms,
                    "Rooms filtered by dates successfully !!"
                )
            )
    }


    const filteredRooms = rooms.map(async (room) => {
        const roomAvailility = await getRoomAvailibility(room?._id, fromDate, toDate);
        room.totalRooms = roomAvailility;
        return roomAvailility > 0 ? room : null;
    });

    let result = await Promise.all(filteredRooms);
    result = result.filter(room => room !== null)
    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                result,
                "Rooms filtered by dates successfully !!"
            )
        )

})

export const filterRoomsBySearch = asyncHandler(async (req, res) => {

    const { query, fromDate, toDate } = req.body;
    const rooms = await Room.find({});

    if (fromDate && toDate) {
        const filteredRooms = rooms.map(async (room) => {
            const roomAvailility = await getRoomAvailibility(room?._id, fromDate, toDate);
            room.totalRooms = roomAvailility;
            return roomAvailility > 0 ? room : null;
        });

        let result = await Promise.all(filteredRooms);
        result = result.filter(room => room !== null)

        const searchedRooms = result.filter(room => (
            room?.roomName?.toLowerCase()?.includes(query.toLowerCase())
        ));

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    searchedRooms,
                    "Rooms filtered by query successfully !!"
                )
            )
    } else {

        const searchedRooms = rooms.filter(room => (
            room?.roomName?.toLowerCase()?.includes(query.toLowerCase())
        ));

        res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    searchedRooms,
                    "Rooms filtered by query successfully !!"
                )
            )
    }


})