import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    roomName:{
        type : String,
        require : true 
    },
    rent : {
        type : Number ,
        require : true 
    },
    imageUrl : {
        type : String ,
        require : true 
    },
    totalRooms : {
        type : Number ,
        default : 0 ,
        require : true 
    }
},{
    timestamps : true 
})

const Room = mongoose.model("Room",roomSchema) ;

export default Room ;