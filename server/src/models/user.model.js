import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name : {
        type : String,
        require : true 
    },
    email : {
        type : String ,
        require : true 
    },
    password : { 
        type : String ,
        require : true 
    },
    contactNumber : {
        type : String
    },
    refreshToken : {
        require : true ,
        type : String
    },
    emailVerificationToken : {
        require : true ,
        type : String
    },
    emailVerificationTokenExpiry : {
        require : true ,
        type : Date
    },
    forgetPasswordToken : {
        require : true ,
        type : String
    },
    forgetPasswordTokenExpiry : {
        require : true ,
        type : Date
    },
    isAdmin : {
        type : Boolean ,
        require : true ,
        default : false 
    }
},{
    timestamps : true 
})

const User = mongoose.model("User",userSchema);

export default User ;