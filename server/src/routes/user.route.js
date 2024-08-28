import express from "express";
import userModel from "../models/UserModel.js";
import { sendQueryMail } from "../mailsender/mailsender.js";
const router = express.Router();

router.post("/registerUser", async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userNumber } = req.body;
        const users = await userModel.find({ userEmail: userEmail });
        if (users.length > 0) {
            res.json({ "message": "User Already Exits With Same Email!" });
        } else {
            const newUser = new userModel({
                userName,
                userEmail,
                userPassword,
                userNumber
            });
            await newUser.save();
            const user = await userModel.findOne({ userEmail: userEmail });
            res.json({ ...user, "message": "success" });
        }
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.post("/loginUser", async (req, res) => {
    try {
        const { userEmail, userPassword } = req.body;
        const user = await userModel.find({ userEmail: userEmail });
        if (user.length < 0) {
            res.json({ "message": "Please Login With Right Credentials!!" });
        } else {
            if (user[0].userPassword === userPassword) {
                res.json({ ...user, "message": "success" });
            } else {
                res.json({ "message": "Please Login With Right Credentials!!" });
            }
        }
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.get("/allUsers", async (req, res) => {
    try {
        const users = await userModel.find({});
        res.json({ users, "message": "success" })
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.get("/allAdmins", async (req, res) => {
    try {
        const admins = await userModel.find({isAdmin:true});
        res.json({ admins, "message": "success" })
    } catch (error) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.post("/isAdmin", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findOne({ _id: userId });
        const isAdmin = user.isAdmin;
        res.json({ isAdmin, "message": "success" });
    } catch (error) {
        res.status(400).json({ "message": "internal server error" });
    }
})

router.post("/adminLogin", async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await userModel.findOne({ userEmail: userName });
        if (!user) {
            res.json({ "message": "Please Login With Right Credentials!!" });
        } else {
            if (user.userPassword === password && user.isAdmin) {
                res.json({ ...user, "message": "success" });
            } else {
                res.json({ "message": "Please Login With Right Credentials!!" });
            }
        }
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.patch("/editUser", async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userNumber, _id } = req.body;
        const users = await userModel.findByIdAndUpdate( _id , 
            {
                $set: {
                    userName,
                    userEmail,
                    userPassword,
                    userNumber
                }
            }
        );
        res.json({ ...users, "message": "success" });
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.delete("/deleteUser", async (req, res) => {
    try {
        const { _id } = req.body;
        console.log(_id)
        const users = await userModel.findByIdAndDelete( _id);
        res.json({ ...users, "message": "success" });
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

router.post("/registerAdmin", async (req, res) => {
    try {
        const { userName, userEmail, userPassword, userNumber } = req.body;
        const users = await userModel.find({ userEmail: userEmail });
        if (users.length > 0) {
            res.json({ "message": "User Already Exits With Same Email!" });
        } else {
            const newUser = new userModel({
                userName,
                userEmail,
                userPassword,
                userNumber,
                isAdmin : true 
            });
            await newUser.save();
            const user = await userModel.findOne({ userEmail: userEmail });
            res.json({ ...user, "message": "success" });
        }
    } catch (err) {
        res.status(400).json({ "message": "internal server error" })
    }
})

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