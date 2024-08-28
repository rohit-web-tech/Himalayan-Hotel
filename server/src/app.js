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
    origin : "*"
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



export default app ;