import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    room: {
        type: mongoose.Schema.ObjectId,
        ref: "Room",
        require: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        require: true
    },
    payment: {
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
        require: true
    }],
    quantity: {
        type: Number,
        require: true,
        default : 1
    },
    fromDate: {
        type: String,
        require: true
    },
    toDate: {
        type: String,
        require: true
    },
    totalDays: {
        type: Number,
        require: true
    },
    totalAmount: {
        type: Number,
        require: true
    },
    refundedAmount: {
        type: Number
    },
    paymentMode : {
        type : String ,
        Enum : ["prepaid" , "cash"],
        require : true
    },
    OTP : {
        type : String ,
        length : 6
    },
    status: {
        type: String,
        require: true,
        Enum: ["Booked", "Cancelled", "Checked Out","Checked In"],
        default: "booked"
    }
}, {
    timestamps: true
})

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;