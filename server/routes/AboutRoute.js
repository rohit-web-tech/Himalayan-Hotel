import express from "express";
import AboutModel from "../models/AboutModel.js";
const router = express.Router();

router.get("/getAbout", async(req,res)=>{
    try {
        const about = await AboutModel.findOne({});
        res.json({about,"message":"success"});
    } catch (error) {
        res.json({"message":"internal server error"});
    }
})

router.post("/setAbout",async(req,res)=>{
    try {
        const {title, imageUrl , description} = req.body ;
        await AboutModel.deleteMany({});
        const about = new AboutModel({title, imageUrl , description});
        await about.save();
        res.json({about,"message":"success"});
    } catch (error) {
        res.json({"message":"internal server error"})
    }
})

export default router ;