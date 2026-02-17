import mongoose from "mongoose";

const referralSchema = new mongoose.Schema({
  referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  name: String,
  email: String,
  contact: String,
  experience: Number,
  currComp: String,
  linkedin: String,
  resumeUrl: String,

  // ✅ ADD THIS
  skills: {
    type: [String],
    default: []
  },

  verificationToken: String,
  tokenExpiry: Date,

  status: {
    type: String,
    default: "pending",
    enum: ["pending", "verified", "shortlisted", "rejected", "hold"]
  }

}, { timestamps: true });

export default mongoose.model("Referral", referralSchema);
