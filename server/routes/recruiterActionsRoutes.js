import express from "express";
import { protect, recruiterOnly } from "../middlewares/auth.js";
import { takeAction } from "../controllers/recruiterDecision.js";

const recruiterActionrouter = express.Router();

recruiterActionrouter.post(
  "/action/:referralId",
  protect,
  recruiterOnly,
  takeAction
);

export default recruiterActionrouter;
