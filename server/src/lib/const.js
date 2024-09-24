import "dotenv/config";

console.log(process.env.DOMAIN)

export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'none',
    domain : ".netlify.app"
}