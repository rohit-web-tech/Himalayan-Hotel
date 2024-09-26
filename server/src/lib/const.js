import "dotenv/config";

export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'None',
    domain : '.netlify.app', 
    path : "/"
}
