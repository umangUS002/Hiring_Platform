import mongoose from "mongoose";

const recruiterActionSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  referralId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Referral",
    required: true
  },

  decision: {
    type: String,
    enum: ["shortlisted", "rejected", "hold"],
    required: true
  },

  note: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model("RecruiterAction", recruiterActionSchema);
