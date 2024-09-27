import Booking from "../models/booking.model.js";
import Room from "../models/room.model.js";
import ApiError from "./apiError.js";
import moment from "moment";

export const getRoomAvailibility = async (roomId, fromDate, toDate) => {

    const room = await Room.findOne({
        _id: roomId
    });

    if (!room) {
        throw new ApiError(404, "Room not found");
    }

    const roomBookings = await Booking.find({
        room: roomId,
        status: "booked"
    });

    if (!roomBookings || roomBookings?.length < 1) {
        return room?.totalRooms;
    }

    const from = moment(fromDate, 'DD-MMM-YYYY');
    const to = moment(toDate, 'DD-MMM-YYYY');

    let bookingCount = 0;

    roomBookings?.forEach(booking => {
        const bookingFrom = moment(booking?.fromDate,"DD-MMM-YYYY")
        const bookingTo = moment(booking?.toDate,"DD-MMM-YYYY")
        if (
            moment(from).isBetween(bookingFrom, bookingTo) ||
            moment(to).isBetween(bookingFrom, bookingTo) ||
            moment(bookingFrom).isBetween(from, to) ||
            moment(bookingTo).isBetween(from, to) || 
            moment(bookingTo) == moment(to) || 
            moment(bookingFrom) == moment(from)
        ) {
            bookingCount++;
        }
    })

    const roomAvailibility = room?.totalRooms - bookingCount ;

    if(roomAvailibility < 1){
        return 0 ;
    }

    return roomAvailibility ;

}
