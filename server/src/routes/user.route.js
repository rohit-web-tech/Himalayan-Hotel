import express from "express";
import { sendQueryMail } from "../mailsender/mailsender.js";
import { 
    deleteUser, 
    editUser, 
    getAllAdmins, 
    getAllUsers, 
    getCurrentUser, 
    loginAdmin, 
    loginUser, 
    logout,
    registerAdmin, 
    registerUser
} from "../controllers/user.controller.js";
import {
    adminAuth,
    auth
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/registerUser").post(registerUser);
router.route("/loginUser").post(loginUser);
router.route("/allUsers").get(auth,adminAuth,getAllUsers); 
router.route("/allAdmins").get(auth,adminAuth,getAllAdmins);
router.route("/adminLogin").post(loginAdmin);
router.route("/editUser").patch(auth,adminAuth,editUser);
router.route("/deleteUser").delete(auth,adminAuth,deleteUser);
router.route("/registerAdmin").post(auth,adminAuth,registerAdmin);
router.get("/currentUser").post(auth,getCurrentUser);
router.post("/logout").post(auth,logout);

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