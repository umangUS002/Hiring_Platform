import express from "express";
import { protect, recruiterOnly } from "../middlewares/auth.js";
import { getMyActions, takeAction } from "../controllers/recruiterDecision.js";

const recruiterActionrouter = express.Router();

recruiterActionrouter.post(
  "/action/:referralId",
  protect,
  recruiterOnly,
  takeAction
);

recruiterActionrouter.get(
  "/my-actions",
  protect,
  recruiterOnly,
  getMyActions
);

export default recruiterActionrouter;
