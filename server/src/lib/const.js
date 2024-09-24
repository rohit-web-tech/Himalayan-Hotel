import "dotenv/config";

console.log(process.env.DOMAIN)

export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'None' ,
    domain : '.netlify.app'
}