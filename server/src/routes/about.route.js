import express from "express";
import {adminAuth, auth} from "../middlewares/auth.middleware.js";
import { getAbout, setAbout } from "../controllers/about.controller.js";
const router = express.Router();

router.route("/about")
.get(getAbout)
.post(auth,adminAuth,setAbout)

export default router ;