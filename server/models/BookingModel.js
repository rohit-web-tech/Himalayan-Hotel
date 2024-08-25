import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
    room_id : { 
        type : Number ,
        require : true 
    },
    imageUrl : {
        type : String,
        required : true 
    },
    roomName : {
        type : String ,
        require : true 
    },
    userId : {
        type : String ,
        require : true 
    },
    userName : {
        type : String ,
        require : true 
    },
    userEmail : {
        type : String ,
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
        default : "booked"
    }
},{
    timestamps : true 
})

const bookingModel = mongoose.model("bookings",bookingSchema) ;

export default bookingModel ;