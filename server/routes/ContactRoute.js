import express from "express";
import ContactModel from "../models/ContactModel.js";
const router = express.Router();

router.get("/getContact", async(req,res)=>{
    try {
        const contact = await ContactModel.findOne({});
        res.json({contact,"message":"success"});
    } catch (error) {
        res.json({"message":"internal server error"});
    }
})

router.post("/setContact",async(req,res)=>{
    try {
        const {contact, email , address,imageUrl} = req.body ;
        await ContactModel.deleteMany({});
        const contactDetails = new ContactModel({contact, email , address,imageUrl});
        await contactDetails.save();
        res.json({contact : contactDetails,"message":"success"});
    } catch (error) {
        console.log(error)
        res.json({"message":"internal server error"})
    }
})

export default router ;