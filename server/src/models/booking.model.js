import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    room : {
        type : mongoose.Schema.ObjectId , 
        ref : "Room" ,
        require : true 
    },
    user : {
        type : mongoose.Schema.ObjectId ,
        ref : "User" ,
        require : true 
    },
    fromDate : {
        type : String ,
        require : true 
    },
    toDate : { 
        type : String ,
        require : true 
    },
    totalDays : { 
        type : Number ,
        require : true 
    },
    totalAmount : {
        type : Number ,
        require : true 
    },
    status : {
        type : String , 
        require : true ,
        Enum : ["booked","cancelled","checked out"] ,
        default : "booked"
    }
},{
    timestamps : true 
})

const Booking = mongoose.model("Booking",bookingSchema) ;

export default Booking ;