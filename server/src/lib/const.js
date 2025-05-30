export const options = {
    httpOnly: true,
    secure: true,
    sameSite : 'None'
}

export function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}