import { Router } from "express";
import {getMedia, mediaUploader} from "../controllers/media.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/upload").post(verifyJWT, upload.single("file"), mediaUploader)
router.route("/getMedia").get(verifyJWT, getMedia)

export default router
