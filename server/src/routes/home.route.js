import express from "express";
import { adminAuth, auth } from "../middlewares/auth.middleware.js";
import { getHome, setHome } from "../controllers/home.controller.js";
const router = express.Router();

router.route("/")
.get(getHome)
.post(auth,adminAuth,setHome)

export default router ;