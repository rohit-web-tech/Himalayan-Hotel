import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    room_id : {
        type : Number ,
        require : true
    },
    roomName:{
        type : String,
        require : true 
    },
    roomRent : {
        type : Number ,
        require : true 
    },
    maxCount : {
        type : Number ,
        require : true 
    },
    imageUrls : {
        type : String ,
        require : true 
    },
    currentBookings : []
},{
    timestamps : true 
})

const roomModel = mongoose.model("rooms",roomSchema) ;

export default roomModel ;