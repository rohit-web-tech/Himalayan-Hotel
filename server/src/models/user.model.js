import mongoose from "mongoose";
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;

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
    isVerified : {
        type : Boolean ,
        default : false ,
        require : true
    } ,
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
});

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
    }
    next() ;
})

userSchema.methods.isCorrectPassword = async function(newPassword){
    return await bcrypt.compare(newPassword,this.password);
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model("User",userSchema);

export default User ;