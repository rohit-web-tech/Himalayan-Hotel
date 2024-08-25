import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    userName : {
        type : String,
        require : true 
    },
    userEmail : {
        type : String ,
        require : true 
    },
    userPassword : { 
        type : String ,
        require : true 
    },
    userNumber : {
        type : String
    }, 
    isAdmin : {
        type : Boolean ,
        require : true ,
        default : false 
    }
},{
    timestamps : true 
})

const userModel = mongoose.model("users",userSchema);

export default userModel ;