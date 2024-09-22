import nodemailer from 'nodemailer';
import Booking from '../models/booking.model.js';
import Room from '../models/room.model.js';
import "dotenv/config.js";

const client = process.env.CLIENT_URI ;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.myEmail,
        pass: process.env.password
    }
});

function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

export async function sendPreAlertMail(date) {
    const bookings = await Booking.find({ toDate: date, status : "booked"});
    if (bookings.length > 0) {
        bookings.forEach(booking => {
                let mailOptions = {
                    from: process.env.myEmail,
                    to: booking.userEmail,
                    subject: 'PRE CHECK OUT ALERT FROM THE HIMALAYAN HOTEL',
                    html: `
                    <div style="width:100%; display:flex; justify-content:center;">
                        <div style="max-width:800px;text-align: justify; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            <h1 style="text-align:center ; color:#088178">PRE CHECK OUT ALERT !</h1>
                            <h3>Hi,<span style="color:#088178">${booking.userName}</span></h3>
                            <p style="color:#414141;">
                                Hope you've been enjoying your time with us!<br><br>
                                Just wanted to give you a heads-up that <span style="font-weight: bolder; color :#088178;">your check-out time for the
                                    booking of ${booking.roomName} from ${booking.fromDate} to ${booking.toDate} is toady at 12:00 PM.</span> We're here to
                                make your departure hassle-free. If you have any specific needs or requests for your check-out, feel free to
                                let us know in advance.
                                We're grateful for your stay and want to ensure that your departure is as smooth as your stay has been. If
                                there's anything we can do to assist you before you go, please don't hesitate to reach out.
                                <br><br> Looking forward to making your check-out effortless!</p>
                            <h4>Regards from <a target="_blank" href=${client} style="color:#088178 ; text-decoration: none;">THE HIMALAYAN HOTEL.</a></h4>
                            <a target="_blank" href="${client}/userProfile"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
                                Click Here For More Information
                            </button></a> 
                        </div>
                    </div>
                        `
                };
                sendEmail(mailOptions);
        });
    }
}

export async function sendCheckOutMail(date) {
    const bookings = await Booking.find({ toDate: date, status : "booked" });
    if (bookings.length > 0) {
        bookings.forEach(async (booking) => {
                booking.status = "checked out";
                let mailOptions = {
                    from: process.env.myEmail,
                    to: booking.userEmail,
                    subject: 'CHECK OUT CONFIRMATION FROM THE HIMALAYAN HOTEL',
                    html: `
                    <div style="width:100%; display:flex; justify-content:center;">
                        <div style="max-width:800px;text-align: justify; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                            <h1 style="text-align:center ; color:#088178">CHECK OUT CONFIRMATION !</h1>
                            <h3>Hi,<span style="color:#088178">${booking.userName}</span></h3>
                            <p style="color:#414141;">
                                Hope you've enjoyed your time with us!<br><br>
                                Just wanted to give you a confirmation that <span style="font-weight: bolder; color :#088178;">your
                                    booking for ${booking.roomName} from ${booking.fromDate} to ${booking.toDate} has been checked out automatically from hotel side as your check out time has been reached.</span> We're here to
                                make your departure hassle-free. If you have any specific needs or requests for your check-out, feel free to
                                let us know in advance.
                                We're grateful for your stay and want to ensure that your departure is as smooth as your stay has been. If
                                there's anything we can do to assist you before you go, please don't hesitate to reach out.
                                <br><br>Thanks for stay with us ! Please Visit Again</p>
                            <h4>Regards from <a target="_blank" href=${client} style="color:#088178 ; text-decoration: none;">THE HIMALAYAN HOTEL.</a></h4>
                            <a target="_blank" href="${client}/userProfile"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
                                Click Here For More Information
                            </button></a> 
                        </div>
                    </div>
                        `
                };
                sendEmail(mailOptions);
                await booking.save();
        })
    }
}

export async function roomBookingMail(roomName, user, fromDate, toDate) {
    let mailOptions = {
        from: process.env.myEmail,
        to: user?.email,
        subject: 'BOOKING CONFIRMATION FROM THE HIMALAYAN HOTEL',
        html: `
        <div style="max-width:800px;text-align:justify;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif"><div class="adM">
                </div><h1 style="text-align:center;color:#088178">ROOM BOOKED SUCCESSFULLY !</h1>
                <h3>Hi,<span style="color:#088178">${user?.name}</span></h3>
                <p style="color:#414141">
                    Thanks for choosing us!<br><br>
                    Just wanted to give you a confirmation that <span style="font-weight:bolder;color:#088178">your
                    booking for ${roomName} from ${fromDate} to ${toDate} has been successfully done.</span> We're here to
                    make your stay enjoyable. If you have any specific needs or requests for your stay, feel free to
                    let us know we are always at your service.
                    We're grateful for your stay and want to ensure that your stay will be very smooth and enjoyable. If
                    there's anything we can do to assist you, please don't hesitate to reach out us.
                    <br><br> Looking forward to make your check-in effortless!</p>
                <h4>Welcome to <a href=${client} style="color:#088178;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://hotel.rohitweb.tech&amp;source=gmail&amp;ust=1704270815561000&amp;usg=AOvVaw0dFCqzeb-cjn09mBU-Nq9q">THE HIMALAYAN HOTEL.</a></h4>
                <a href="${client}/userProfile" target="_blank" data-saferedirecturl="https://www.google.com/url?q=${client}/userProfile&amp;source=gmail&amp;ust=1704270815561000&amp;usg=AOvVaw3OmZvcapVcpCnTtDKUQPny"><button style="border:none;padding:5px 10px;margin-top:20px;color:white;font-size:14px;background:#088178">
                    Click Here For More Information
                </button></a><div class="yj6qo"></div><div class="adL"> 
            </div></div>
            `
    };
    let adminMailOptions = {
        from: process.env.myEmail,
        to: process.env.myEmail,
        subject: 'New Room Booking',
        html: `
        <div style="max-width:800px;text-align:justify;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif"><div class="adM">
            </div><h1 style="text-align:center;color:#088178">New Room Booking !</h1>
                <h3>Hi,<span style="color:#088178">Admin</span></h3>
                <p style="color:#414141">
                    Just wanted to give you an alert that just got a <span style="font-weight:bolder;color:#088178">
                    booking for ${roomName} from ${fromDate} to ${toDate} by ${user?.name}(${user?.email}).</span> 
                </p>
            </div>
        </div>
            `
    }
    sendEmail(mailOptions);
    sendEmail(adminMailOptions);
}

export async function bookingCancelMail(booking,user,roomName) {
    let mailOptions = {
        from: process.env.myEmail,
        to: user?.email,
        subject: 'BOOKING CENCELATION CONFIRMATION FROM THE HIMALAYAN HOTEL',
        html: `
        <div style="width:100%; display:flex; justify-content:center;">
            <div style="max-width:800px;text-align: justify; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <h1 style="text-align:center ; color:#088178">ROOM BOOKING CANCELLED !</h1>
                <h3>Hi,<span style="color:#088178">${user?.name}</span></h3>
                <p style="color:#414141;">
                    Your Booking has been cancelled successfully!<br><br>
                    Just wanted to give you a confirmation that <span style="font-weight: bolder; color :#088178;">your
                    booking for ${roomName} from ${booking?.fromDate} to ${booking?.toDate} has been cancelled as per your request.</span>
                <h4>Best Regards from <a target="_blank" href=${client} style="color:#088178 ; text-decoration: none;">THE HIMALAYAN HOTEL.</a></h4>
                <a target="_blank" href="${client}/userProfile"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
                    Click Here For More Information
                </button></a> 
            </div>
        </div>
            `
    };
    let adminMailOptions = {
        from: process.env.myEmail,
        to: process.env.myEmail,
        subject: 'Room Booking Cancelled',
        html: `
        <div style="max-width:800px;text-align:justify;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif"><div class="adM">
            </div><h1 style="text-align:center;color:#088178">Room Booking Cancelled!</h1>
                <h3>Hi,<span style="color:#088178">Admin</span></h3>
                <p style="color:#414141">
                    Just wanted to give you an alert that <span style="font-weight:bolder;color:#088178">
                    booking for ${roomName} from ${booking?.fromDate} to ${booking?.toDate} by ${user?.name}(${user?.email}) has been cancelled by customer.</span> 
                </p>
            </div>
        </div>
            `
    }
    sendEmail(mailOptions);
    sendEmail(adminMailOptions);
}

export async function sendQueryMail(name, email, contact, message) {
    let mailOptions = {
        from: process.env.myEmail,
        to: process.env.myEmail,
        subject: 'New Enquiry From The Himalayan Hotel',
        html: `
            <h1>New Enquiry From The Himalayan Hotel</h1>
            <p>Enquiry Details:</p>
            <ul style="list-style-type:disc">
            <li>Enquirer Name: ${name}</li>
            <li>Email: ${email}</li>
            <li>Contact: ${contact}</li>
            <li>Message: ${message}</li>
            </ul>
            `
    };
    sendEmail(mailOptions);
}

export async function sendEmailVerificationMail(name, email, token){
    let mailOptions = {
        from: process.env.myEmail,
        to: email,
        subject: 'EMAIL VERIFICATION MAIL FROM THE HIMALAYAN HOTEL !!',
        html: `
        <div style="width:100%; display:flex; justify-content:center;">
            <div style="max-width:800px;text-align: justify; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <h1 style="text-align:center ; color:#088178">Welcome to The Himalayan Hotel !</h1>
                <h3>Hi <span style="color:#088178">${name},</span></h3>
                <p style="color:#414141;">
                    Verify your email to complete registeration process!<br><br>
                    Please verify your email to complete verification process by just clicking on below link :
                </p>
                <a href="${client}/verifyEmail/${token}" target="_blank">${client}/verifyEmail/${token}</a>
                <h4>Thanks for registeration on <a target="_blank" href=${client} style="color:#088178 ; text-decoration: none;">THE HIMALAYAN HOTEL.</a></h4>
            </div>
        </div>
            `
    };
    sendEmail(mailOptions);
}