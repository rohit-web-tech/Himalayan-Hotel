import ApiError from "../lib/apiError.js";
import asyncHandler from "../lib/asyncHandler.js";
import { sendEmailVerificationMail } from "../lib/mailsender.js";
import { generateAccessAndRefeshTokens, generateToken } from "../lib/token.js";
import User from "../models/user.model.js";
import options from "../lib/const.js";

export const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, contactNumber } = req.body;

    if (!name || !email || !password || !contactNumber) {
        throw new ApiError(400, "All fields are required!!");
    }

    const emailCheck = await User.findOne({
        email,
        $or: [{ isVerified: true }, { emailVerificationTokenExpiry: { $gt: Date.now() } }]
    });

    if (emailCheck) {
        throw new ApiError(400, "User already exist with same email !!");
    }

    const newUser = await User.create({ name, email, password, contactNumber });

    const [token, tokenExpiry] = await generateToken();

    newUser.emailVerificationTokenExpiry = tokenExpiry;
    newUser.emailVerificationToken = token;

    await sendEmailVerificationMail(name, email, token);

    await newUser.save();

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {},
                "User created successfully!!",
            )
        )

})

export const registerAdmin = asyncHandler(async (req, res) => {

    const { name, email, password, contactNumber } = req.body;

    if (!name || !email || !password || !contactNumber) {
        throw new ApiError(400, "All fields are required!!");
    }

    const emailCheck = await User.findOne({
        email,
        $or: [{ isVerified: true }, { emailVerificationTokenExpiry: { $gt: Date.now() } }]
    });

    if (emailCheck) {
        throw new ApiError(400, "User already exist with same email !!");
    }

    const newUser = await User.create({ name, email, password, contactNumber, isVerified: true, isAdmin: true });

    await newUser.save();

    res
        .status(201)
        .json(
            new ApiResponse(
                201,
                {},
                "Admin created successfully!!",
            )
        )

})

export const verifyEmail = asyncHandler(async (req, res) => {

    const { token } = req.body;

    if (!token) {
        throw new ApiError(400, "Token is required!!");
    }

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationTokenExpiry: {
            $gt: Date.now()
        }
    });

    if (!user) {
        throw new ApiError(401, "Verification token is either already used or expired!!")
    }

    user.emailVerificationToken = "";
    user.emailVerificationTokenExpiry = Date.now();
    user.isVerified = true;

    await user.save();

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Email verified successfully!!",
            )
        )

})

export const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required !!");
    }

    const user = await User.findOne({
        email,
        $or: [{ isVerified: true }, { emailVerificationTokenExpiry: { $gt: Date.now() } }]
    }).select("-password -emailVerificationTokenExpiry - emailVerificationToken -forgetPasswordToken -forgetPasswordTokenExpiry");

    if (!user) {
        throw new ApiError(400, "User doesn't exist with this email!!");
    }

    if (!(user.isVerified)) {
        throw new ApiError(400, "Email is not verified, please verify your email first to login!!");
    }

    const isPasswordCorrect = await user.isPasswordCorrect();

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Please login with right credentials!!");
    }

    const [AccessToken, RefreshToken] = await generateAccessAndRefeshTokens(user);

    user.refreshToken = RefreshToken;

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user, AccessToken, RefreshToken },
                "You are logged in successfully!!"
            )
        )
        .cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken", RefreshToken, options)

})

export const loginAdmin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required !!");
    }

    const admin = await User.findOne({
        email,
        isAdmin: true
    }).select("-password -emailVerificationTokenExpiry - emailVerificationToken -forgetPasswordToken -forgetPasswordTokenExpiry");

    if (!admin) {
        throw new ApiError(400, "Please login with right credentials!!");
    }

    const isPasswordCorrect = await admin.isPasswordCorrect();

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Please login with right credentials!!");
    }

    const [AccessToken, RefreshToken] = await generateAccessAndRefeshTokens(admin);

    admin.refreshToken = RefreshToken;

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { admin, AccessToken, RefreshToken },
                "You are logged in successfully!!"
            )
        )
        .cookie("AccessToken", AccessToken, options)
        .cookie("RefreshToken", RefreshToken, options)

})

export const getAllUsers = asyncHandler(async () => {

    const users = await User.find(
        {
            isVerified: true
        }
    ).select("-password -emailVerificationTokenExpiry - emailVerificationToken -forgetPasswordToken -forgetPasswordTokenExpiry");

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                users,
                "Success!!"
            )
        );

});

export const getAllAdmins = asyncHandler(async () => {

    const admins = await User.find(
        {
            isAdmin: true
        }
    ).select("-password -emailVerificationTokenExpiry - emailVerificationToken -forgetPasswordToken -forgetPasswordTokenExpiry");

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            admins,
            "Success!!"
        )
    )

});

export const getCurrentUser = asyncHandler(async(req,res)=>{

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            res?.user,
            "User fetched successfully !!"
        )
    );

});

export const logout = asyncHandler(async(req,res)=>{

    await User.findByIdAndUpdate(
        {
            _id: req?.user?._id
        },
        {
            $unset: {
                refreshToken: 1
            }
        }
    )

    res 
    .status(200)
    .json(
        200,
        {},
        "You are logged out successfully !!"
    )
    .clearCookie("AccessToken",options)
    .clearCookie("RefreshToken", options)

})

export const deleteUser = asyncHandler(async()=>{

    const {userId} = req.body ;

    if(!userId){
        throw new ApiError(400,"UserId is required !!")
    }

    const user = await User.findByIdAndDelete(userId);

    if(!user){
        throw new ApiError(404,"User doesn't exist !!")
    }

    const allUsers = await User.find({isVerified:true});

    res
    .status(200)
    .json(
        new ApiResponse(
            200,
            allUsers,
            "User deleted successfully !!"
        )
    )

})

export const editUser = asyncHandler(async(req,res)=>{

    const { name, email, password, contactNumber, userId } = req.body;

    if (!name || !email || !password || !contactNumber) {
        throw new ApiError(400, "All fields are required!!");
    }

    if(!userId){
        throw new ApiError(400,"UserId is required !!")
    }

    const emailCheck = await User.findOne({
        email,
        _id :  { $ne : userId }
    });

    if (emailCheck) {
        throw new ApiError(400, "Another user already exist with same email !!");
    }

    await User.findByIdAndUpdate(
        userId ,
        {
            $set : {
                name, 
                email, 
                password, 
                contactNumber
            }
        }
    );

    const allUsers = await User.find({isVerified:true});

    res
        .status(200)
        .json(
            new ApiResponse(
                200,
                allUsers,
                "User's details updated successfully !!"
            )
        )
    
})