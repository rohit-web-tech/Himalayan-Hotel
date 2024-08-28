import "dotenv/config";
import jwt from "jsonwebtoken";

const decodeToken = async (token) => {
    const res = await jwt.decode(
        token,
        process.env.JWT_SECRET_KEY
    )
    return res;
}

export {
    decodeToken
};