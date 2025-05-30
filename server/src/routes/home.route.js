import express from "express";
import { adminAuth, auth } from "../middlewares/auth.middleware.js";
import { getHome, setHome } from "../controllers/home.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router.route("/")
.get(getHome)
.post(auth,adminAuth,upload.single("image"),setHome)

export default router ;