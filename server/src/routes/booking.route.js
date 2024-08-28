import "dotenv/config.js";
import express from 'express'
import moment from 'moment'
import bookingModel from '../models/BookingModel.js'
import roomModel from '../models/RoomModel.js'
import userModel from '../models/UserModel.js'
import Twilio  from 'twilio'
import { bookingCancelMail, roomBookingMail } from "../mailsender/mailsender.js";
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = Twilio(accountSid, authToken)
const router = express.Router();
const fromNumber = process.env.fromNumber;
const toNumber = process.env.toNumber;

let sendMessageToAdmin = (message) =>{
    client.messages
        .create({
            body: message,
            from: fromNumber,
            to: toNumber
        })
        .then(message => console.log(`SMS sent: ${message.sid}`))
        .catch(error => console.error(`Error sending SMS: ${error.message}`));
}


router.post("/bookRoom",async(req,res)=>{
    const {roomId,fromDate,toDate,userId} = req.body ; 
    try {
        const FromDate = moment(fromDate,'DD-MMM-YYYY');
        const ToDate = moment(toDate,'DD-MMM-YYYY');
        const user = await userModel.findOne({_id:userId});
        const totalDays = moment.duration(ToDate.diff(FromDate)).asDays()+1;
        const room = await roomModel.findOne({room_id:roomId});
        const totalAmount = room.roomRent*totalDays ;
        const newBooking = new bookingModel({
            roomName : room.roomName ,
            room_id : room.room_id ,
            imageUrl : room.imageUrls,
            userName : user.userName ,
            userEmail : user.userEmail,
            totalAmount ,
            userId,
            fromDate,
            toDate,
            totalDays
        }) ;
        await newBooking.save();
        const bookingId  = newBooking._id ;
        room.currentBookings.push({bookingId,fromDate,toDate,roomId,userId,totalAmount,status:"booked"});
        await room.save();
        const message = `Hey, Got a new booking for ${room.roomName} from ${fromDate} to ${toDate} by ${user.userName} ${user.userEmail}!!`;
        sendMessageToAdmin(message);
        roomBookingMail(room?.roomName,user,fromDate,toDate);
        res.json({"message":"success"})
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"internal server error"})
    }
})

router.post('/getUserBookings',async(req,res)=>{
    const {userId} = req.body ;
    try {
        const bookings = await bookingModel.find({userId});
            res.json({bookings});
    } catch (error) {
        res.status(400).json({"message" : "internal server error"});
    }
})

router.post("/cancelBooking",async(req,res)=>{
    const {bookingId} = req.body ;
    try {
        console.log(bookingId)
        const booking = await bookingModel.findOne({_id:bookingId});
        booking.status= "cancelled" ;
        await booking.save() ;
        const room = await roomModel.findOne({room_id:booking.room_id});
        let roomBookings = room.currentBookings ;
        room.currentBookings = roomBookings.filter(room=>{
            return room.bookingId != bookingId ;
        });
        await room.save();
        const allBookings = await bookingModel.find({userId : booking.userId});
        const message = `Oops, The booking for ${room.roomName} from ${booking.fromDate} to ${booking.toDate} by ${booking.userName} ${booking.userEmail} has been cancelled by the customer!!`;
        sendMessageToAdmin(message);
        bookingCancelMail(booking);
        res.json(allBookings);
    } catch (error) {
        res.status(400).json({"message" : "internal server error"})
    }
})

router.get("/allBookings",async(req,res)=>{
    try{
        const bookings = await bookingModel.find({});
        res.send({bookings,"message":"success"});
    }catch(err){
        res.status(400).json({"message":"internal server error"});
    }
})

export default router ;
