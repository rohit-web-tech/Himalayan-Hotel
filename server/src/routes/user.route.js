import express from "express";
import { sendQueryMail } from "../mailsender/mailsender.js";
const router = express.Router();

router.route("/registerUser").post();
router.route("/loginUser").post();
router.route("/allUsers").get();
router.route("/allAdmins").get();
router.route("/adminLogin").post();
router.route("/editUser").patch();
router.route("/deleteUser").delete();
router.route("/registerAdmin").post();

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