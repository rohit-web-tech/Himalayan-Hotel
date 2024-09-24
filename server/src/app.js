import "dotenv/config";
import express from "express" ;
import cors from "cors" ;
import cookieParser from "cookie-parser" ;
import cron from "node-cron";
const app = express() ;

// middleawares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin : true,
    credentials: true
}));
app.use(cookieParser());

// node-cron 
cron.schedule('* * * * *', () => {
    let date = moment().format('DD-MMM-YYYY');
    let time = moment().format('LT');
    if (time === "10:36 PM") {
        sendPreAlertMail(date);
    } else if (time === "10:37 PM") {
        sendCheckOutMail(date)
    }
});


// routes
import homeRoute from  "./routes/home.route.js";
import aboutRoute from  "./routes/about.route.js";
import contactRoute from  "./routes/contact.route.js";
import userRoute from  "./routes/user.route.js";
import roomRoute from "./routes/room.route.js";
import bookingRoute from "./routes/booking.route.js";

app.use("/api/home",homeRoute);
app.use("/api/about",aboutRoute);
app.use("/api/contact",contactRoute);
app.use("/api/user",userRoute);
app.use("/api/room",roomRoute);
app.use("/api/booking",bookingRoute);

export default app ;