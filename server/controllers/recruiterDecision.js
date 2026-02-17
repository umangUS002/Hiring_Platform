import RecruiterAction from "../models/RecruiterAction.js";

export const takeAction = async (req, res) => {
  try {

    const { referralId } = req.params;
    const { decision, note } = req.body;

    const existingAction = await RecruiterAction.findOne({
      recruiterId: req.user._id,
      referralId
    });

    if (existingAction) {
      existingAction.decision = decision;
      existingAction.note = note;
      await existingAction.save();
    } else {
      await RecruiterAction.create({
        recruiterId: req.user._id,
        referralId,
        decision,
        note
      });
    }

    res.json({
      success: true,
      message: "Decision recorded"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
