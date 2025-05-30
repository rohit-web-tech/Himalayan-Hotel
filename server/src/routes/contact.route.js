import express from "express";
import { getContact, setContact } from "../controllers/contact.controller.js";
import {auth,adminAuth} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/")
.get(getContact)
.post(auth,adminAuth,upload.single("image"),setContact)

export default router ;