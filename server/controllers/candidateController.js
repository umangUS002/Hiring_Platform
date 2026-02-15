import Referral from "../models/Referral.js";

export const verifyCandidate = async (req, res) => {
  const { referralId, skills } = req.body;

  await Referral.findByIdAndUpdate(referralId, {
    status: "verified"
  });

  res.json({ message: "Candidate verified", skills });
};
