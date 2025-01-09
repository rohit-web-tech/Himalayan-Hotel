import nodemailer from 'nodemailer';
import Booking from '../models/booking.model.js';
import "dotenv/config.js";

const client = process.env.CLIENT_URI ;

const makeDateTimeReadable = (DateTime = "") => {
    // Convert ISO string to Date object
    const date = new Date(DateTime);

    // Format the date to a more readable format
    const readableDate = date.toLocaleString("en-US", {
        year: "numeric", // Four-digit year
        month: "long",   // Full name of the month
        day: "numeric",  // Numeric day
    });

    return readableDate;
}

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
                            <a target="_blank" href="${client}/profile/bookings"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
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
                            <a target="_blank" href="${client}/profile/bookings"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
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

export async function roomBookingMail(room, user, fromDate, toDate, booking, amount, members) {
    let mailOptions = {
        from: process.env.myEmail,
        to: user?.email,
        subject: 'BOOKING CONFIRMATION FROM THE HIMALAYAN HOTEL',
        html: `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <!-- Header Section -->
                        <tr>
                            <td style="background-color: rgb(17, 24, 39); color: #ffffff; text-align: center; padding: 20px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: bold;">Booking Confirmation</h1>
                                <p style="margin: 5px 0 0; font-size: 16px;">Thank you for choosing <The href="${process?.env?.CLIENT_URI}" style="color : white; text-decoration: none;">The Himalayan Hotel</a></p>
                            </td>
                        </tr>
                        <!-- Content Section -->
                        <tr>
                            <td style="padding: 20px;">
                                <p style="font-size: 16px; color: #333333; margin: 0;">Dear <strong> ${user?.name || "guest"}</strong>,</p>
                                <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                    Your booking for <strong>${room?.roomName||"Room"}</strong> has been successfully confirmed. Below are the details of your booking:
                                </p>
                                <!-- Booking Details -->
                                <table width="100%" style="font-size: 14px; color: #555555; margin-top: 20px; border-spacing: 0;">
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Booking ID:</strong></td>
                                        <td style="padding: 5px 0;">${booking?._id}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Check-in:</strong></td>
                                        <td style="padding: 5px 0;">${makeDateTimeReadable(fromDate)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Check-out:</strong></td>
                                        <td style="padding: 5px 0;">${makeDateTimeReadable(toDate)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Guests:</strong></td>
                                        <td style="padding: 5px 0;">${members?.length} (${members?.map(member=> member?.name)})</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Payment Mode:</strong></td>
                                        <td style="padding: 5px 0;">${booking?.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Total Amount:</strong></td>
                                        <td style="padding: 5px 0;">₹${booking?.paymentMode === "cash" ? (amount).toFixed(2) : (amount/100).toFixed(2) }</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- Image Section -->
                        <tr>
                            <td style="padding: 0;">
                                <img src=${room?.imageUrl} alt=${room?.roomName} style="width: 100%; height: auto; display: block;" />
                            </td>
                        </tr>
                        <!-- Room Details Section -->
                        <tr>
                            <td style="padding: 20px;">
                                <h2 style="font-size: 18px; color: rgb(17, 24, 39); margin: 0;">Room Details</h2>
                                <p style="font-size: 14px; color: #555555; margin: 5px 0;">${room?.roomName || "Room"}</p>
                            </td>
                        </tr>
                        <!-- Footer Section -->
                        <tr>
                            <td style="padding: 20px; background-color: #f8f9fa; text-align: center;">
                                <p style="font-size: 12px; color: #777777; margin: 0;">For any queries, contact us at <a href="mailto:${process?.env?.myEmail}" style="color: rgb(17, 24, 39); text-decoration: none;">${process?.env?.myEmail}</a> or call us at ${process?.env?.toNumber}.</p>
                                <p style="font-size: 12px; color: #777777; margin: 5px 0 0;">We look forward to hosting you!</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
            `
    }

    let adminMailOptions = {
        from: process.env.myEmail,
        to: process.env.myEmail,
        subject: `New Booking for ${room.roomName || "Room"}`,
        html: `
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f9fa;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; padding: 20px;">
            <tr>
                <td align="center">
                    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                        <!-- Header Section -->
                        <tr>
                            <td style="background-color: rgb(17, 24, 39); color: #ffffff; text-align: center; padding: 20px;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: bold;">New Booking Recieved !</h1>
                                <p style="margin: 5px 0 0; font-size: 16px;">${room.roomName || "Room"}</p>
                            </td>
                        </tr>
                        <!-- Content Section -->
                        <tr>
                            <td style="padding: 20px;">
                                <p style="font-size: 16px; color: #333333; margin: 0;">Dear <strong> admin</strong>,</p>
                                <p style="font-size: 14px; color: #555555; margin: 10px 0;">
                                     New booking recieved for <strong>${room?.roomName||"Room"}</strong> from ${user?.name}(${user?.email}). Below are the details of your booking:
                                </p>
                                <!-- Booking Details -->
                                <table width="100%" style="font-size: 14px; color: #555555; margin-top: 20px; border-spacing: 0;">
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Booking ID:</strong></td>
                                        <td style="padding: 5px 0;">${booking?._id}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Check-in:</strong></td>
                                        <td style="padding: 5px 0;">${makeDateTimeReadable(fromDate)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Check-out:</strong></td>
                                        <td style="padding: 5px 0;">${makeDateTimeReadable(toDate)}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Guests:</strong></td>
                                        <td style="padding: 5px 0;">${members?.length} (${members?.map(member=> member?.name)})</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Payment Mode:</strong></td>
                                        <td style="padding: 5px 0;">${booking?.paymentMode}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 5px 0;"><strong>Total Amount:</strong></td>
                                        <td style="padding: 5px 0;">₹${booking?.paymentMode === "cash" ? (amount).toFixed(2) : (amount/100).toFixed(2) }</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <!-- Image Section -->
                        <tr>
                            <td style="padding: 0;">
                                <img src=${room?.imageUrl} alt=${room?.roomName} style="width: 100%; height: auto; display: block;" />
                            </td>
                        </tr>
                        <!-- Room Details Section -->
                        <tr>
                            <td style="padding: 20px;">
                                <h2 style="font-size: 18px; color: rgb(17, 24, 39); margin: 0;">Room Details</h2>
                                <p style="font-size: 14px; color: #555555; margin: 5px 0;">${room?.roomName || "Room"}</p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
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
                <a target="_blank" href="${client}/profile/bookings"><button style="border:none ; padding : 5px 10px ; margin-top : 20px ; color : white ; font-size:14px ; cursor: pointer ; background : #088178;">
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