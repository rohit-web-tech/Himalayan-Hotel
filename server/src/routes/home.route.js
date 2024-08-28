import express from "express";
import HomeModel from "../models/HomeModel.js";
const router = express.Router();

router.get("/getHome", async(req,res)=>{
    try {
        const home = await HomeModel.findOne({});
        res.json({home,"message":"success"});
    } catch (error) {
        res.json({"message":"internal server error"});
    }
})

router.post("/setHome",async(req,res)=>{
    try {
        const {title, imageUrl , subtitle} = req.body ;
        await HomeModel.deleteMany({});
        const home = new HomeModel({title, imageUrl , subtitle});
        await home.save();
        res.json({home,"message":"success"});
    } catch (error) {
        console.log(error)
        res.json({"message":"internal server error"})
    }
})

export default router ;