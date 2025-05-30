import express from "express";
import {adminAuth, auth} from "../middlewares/auth.middleware.js";
import { getAbout, setAbout } from "../controllers/about.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/")
.get(getAbout)
.post(auth,adminAuth,upload.single("image"),setAbout)

export default router ;