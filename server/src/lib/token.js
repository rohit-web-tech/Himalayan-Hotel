import "dotenv/config";
import jwt from "jsonwebtoken";
import {v4 as uuid } from "uuid" ;

const decodeToken = async (token) => {
    const res = await jwt.decode(
        token,
        process.env.JWT_SECRET_KEY
    )
    return res;
}

const generateAccessAndRefeshTokens = async(user) => {
    return await Promise.all([
        user?.generateAccessToken(),
        user?.generateRefreshToken()
    ])
}

const generateToken = async()=>{
    const token = await uuid();
    const expiry = Date.now() + 7200000 ;
    return [
        token , 
        expiry
    ]
}

export {
    decodeToken,
    generateAccessAndRefeshTokens,
    generateToken
};