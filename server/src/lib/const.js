import "dotenv/config";

export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'none',
    domain : process.env.DOMAIN
}