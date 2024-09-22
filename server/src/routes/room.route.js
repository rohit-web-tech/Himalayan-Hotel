import express from "express";
import {
    addRoom,
    deleteRoom,
    editRoom,
    filterRoomsByDates,
    filterRoomsBySearch,
    getRoomDetails,
    getRooms
} from "../controllers/room.controller.js";
import {
    adminAuth,
    auth
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/")
    .get(auth, getRooms)
    .post(auth, adminAuth, addRoom)
    .patch(auth, adminAuth, editRoom)
    .delete(auth, adminAuth, deleteRoom);

router.route("/:id")
    .get(auth, getRoomDetails);

router.route("/filterByDate")
    .post(auth, filterRoomsByDates)

router.route("/filterByQuery")
    .post(auth, filterRoomsBySearch)

export default router;