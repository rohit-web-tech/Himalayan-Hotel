import express from "express";
import { getContact, setContact } from "../controllers/contact.controller.js";
import {auth,adminAuth} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.route("/contact")
.get(getContact)
.post(auth,adminAuth,setContact)

export default router ;