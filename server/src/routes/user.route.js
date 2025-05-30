import express from "express";
import { 
    deleteUser, 
    editUser, 
    getAllAdmins,
    getAllUsers, 
    getCurrentUser, 
    loginAdmin, 
    loginUser, 
    logout,
    refreshAccessToken,
    registerAdmin, 
    registerUser,
    updateUserDetails,
    verifyEmail
} from "../controllers/user.controller.js";
import {
    adminAuth,
    auth
} from "../middlewares/auth.middleware.js";
import { sendQueryMail } from "../lib/mailsender.js";
const router = express.Router();
import {upload} from "../middlewares/multer.middleware.js";

router.route("/registerUser").post(upload.single("image"), registerUser);
router.route("/loginUser").post(loginUser);
router.route("/verifyEmail").post(verifyEmail);
router.route("/allUsers").get(auth,adminAuth,getAllUsers);
router.route("/allAdmins").get(auth,adminAuth,getAllAdmins);
router.route("/adminLogin").post(loginAdmin);
router.route("/editUser").patch(auth,adminAuth,upload.single("image"),editUser);
router.route("/deleteUser").delete(auth,adminAuth,deleteUser);
router.route("/registerAdmin").post(auth,adminAuth,upload.single("image"),registerAdmin);
router.route("/currentUser").get(auth,getCurrentUser);
router.route("/logout").get(auth,logout);
router.route("/refreshToken").post(refreshAccessToken);
router.route("/updateMyInfo").patch(auth,updateUserDetails);

router.post("/enquiry", async (req, res) => {
    try {
        const {name,email,contact,message}=req.body;
        await sendQueryMail(name,email,contact,message);
        res.json({"message":"success"});
    } catch (error) {
        res.json({"message":"internal server error"})
    }
})


export default router;