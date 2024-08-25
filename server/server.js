import express from "express";
import RoomRoute from "./routes/RoomRoute.js"
import UserRoute from "./routes/UserRoute.js";
import BookingRoute from './routes/BookingRoute.js';
import AboutRoute from './routes/AboutRoute.js';
import ContactRoute from './routes/ContactRoute.js';
import HomeRoute from './routes/HomeRoute.js';
import cors from "cors";
import moment from 'moment';
import cron from 'node-cron';
import "./dbconfig.js";
import { sendCheckOutMail, sendPreAlertMail } from "./mailsender/mailsender.js";
const PORT = 5500 ;
const app = express();
app.use(express.json());
app.use(cors());
app.use(RoomRoute);
app.use(UserRoute);
app.use(BookingRoute);
app.use(AboutRoute);
app.use(ContactRoute);
app.use(HomeRoute);

cron.schedule('* * * * *', () => {
    let date = moment().format('DD-MMM-YYYY');
    let time = moment().format('LT');
    if (time === "10:36 PM") {
        sendPreAlertMail(date);
    } else if (time === "10:37 PM") {
        sendCheckOutMail(date)
    }
});

app.get("/",(_,res)=>{
    res.send("Hello from himalayan hotel server")
})

app.listen(PORT, '0.0.0.0', (err) => {
    if (err) {
        console.log("Server running error", err)
    }
    else {
        console.log("Server is running on port", PORT);
    }
})
