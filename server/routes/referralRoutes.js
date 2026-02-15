import express from "express";
import { createReferral, getAllReferrals, verifyCandidate } from "../controllers/referralController.js";
import { protect } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const referralRouter = express.Router();

referralRouter.post("/submitReferal", protect, upload.single("resume"), createReferral);
referralRouter.get("/all", protect, getAllReferrals);
referralRouter.get("/verify/:token", verifyCandidate);
export default referralRouter;
