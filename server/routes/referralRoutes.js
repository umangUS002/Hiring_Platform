import express from "express";
import { completeReferral, createReferral, filterReferrals, getAllReferrals, getReferralByToken, verifyCandidate } from "../controllers/referralController.js";
import { protect, recruiterOnly } from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const referralRouter = express.Router();

referralRouter.post("/submitReferal", protect, upload.single("resume"), createReferral);
referralRouter.get("/all", protect, getAllReferrals);
referralRouter.get("/verify/:token", verifyCandidate);
referralRouter.post("/complete/:token", upload.single("resume"), completeReferral);
referralRouter.get("/details/:token", getReferralByToken);

// routes/referralRoutes.js
referralRouter.get("/filter", protect, recruiterOnly, filterReferrals);

export default referralRouter;
