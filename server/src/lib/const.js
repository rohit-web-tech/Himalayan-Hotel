import "dotenv/config";

export const options = {
    httpOnly: true,
    secure: false,
    sameSite : 'none',
    domain : process.env.DOMAIN
}