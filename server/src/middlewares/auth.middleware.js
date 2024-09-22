import ApiError from "../lib/apiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import {decodeToken} from "../lib/token.js";
import User from "../models/user.model.js";

const auth = asyncHandler(async(req,_,next)=>{

    const accessToken = req?.cookies?.AccessToken || req?.headers?.authorization?.replace("Bearer ","") ;

    if(!accessToken) {
        throw new ApiError(401,"Unauthorized request !!");
    }

    const currentUser = await decodeToken(accessToken);

    if(!currentUser) {
        throw new ApiError(401,"Unauthorized request !!");
    }

    const user = await User.findById(currentUser?._id).select("-password -emailVerificationToken -refreshToken -emailVerificationTokenExpiry -forgetPasswordToken -forgetPasswordTokenExpiry");

    if(!user){
        throw new ApiError(401,"Unauthorized request !!");
    }

    req.user = user ;

    next();
})

const adminAuth = asyncHandler(async(req,_,next)=>{
    const user = req.user ;

    if(!user || !user.isAdmin){
        throw new ApiError(401,"Unauthorized request !!");
    }

    next();
})

export {
    auth,
    adminAuth
};