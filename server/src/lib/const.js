import "dotenv/config";

export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'Lax',
    domain : '.netlify.app', 
    path : "/"
}
