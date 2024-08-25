import express from "express";
import RoomModel from "../models/RoomModel.js";
const router = express.Router();

router.get("/getRooms", async (req, res) => {
    try {
        const rooms = await RoomModel.find({});
        res.json(rooms);
    } catch (err) {
        res.status(400).json({ "message": "error" });
    }
})

router.post("/getRoomDetail", async (req, res) => {
    const { roomId } = req.body;
    try {
        const room = await RoomModel.find({ room_id: roomId });
        if (room.length > 0) {
            res.json({ ...room, "message": "success" });
        }
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.delete("/deleteRoom", async (req, res) => {
    const { _id } = req.body;
    try {
        const room = await RoomModel.findByIdAndDelete(_id);
        res.json({ room, "message": "success" });
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.patch("/editRoom", async (req, res) => {
    const { roomName, room_id, roomRent, maxCount, imageUrls, _id } = req.body;
    try {
        await RoomModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    roomName,
                    room_id: parseInt(room_id),
                    roomRent: parseInt(roomRent),
                    maxCount: parseInt(maxCount),
                    imageUrls
                }
            }
        );
        res.json({ "message": "success" });
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.post("/setRoomData", async (req, res) => {
    const { roomName, room_id, roomRent, maxCount, imageUrls } = req.body;
    try {
        const room = await RoomModel.find({ room_id });
        if (room.length > 0) {
            res.json({ "message": "A room already exit with same number !!" });
        } else {
            const newRoom = await new RoomModel({
                roomName,
                room_id: parseInt(room_id),
                roomRent: parseInt(roomRent),
                maxCount: parseInt(maxCount),
                imageUrls
            });
            await newRoom.save();
            res.json({ "message": "success" });
        }
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

export default router;