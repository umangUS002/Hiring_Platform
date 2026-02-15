import Referral from "../models/Referral.js";

export const getReferrals = async (req, res) => {
  const referrals = await Referral.find({ status: "verified" });
  res.json(referrals);
};

export const updateStatus = async (req, res) => {
  const { referralId, status } = req.body;
  await Referral.findByIdAndUpdate(referralId, { status });
  res.json({ message: "Status updated" });
};
