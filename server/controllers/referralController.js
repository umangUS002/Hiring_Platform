import imagekit from "../configs/imageKit.js";
import Referral from "../models/Referral.js";
import User from "../models/User.js";
import crypto from "crypto";
import { sendVerificationEmail, sendRegisterEmail } from "../services/emailService.js";
import fs from "fs";

export const createReferral = async (req, res) => {
  try {

    const { name, email, contact, experience, currComp, linkedProf } = req.body;
    const resumeFile = req.file;

    if (!name || !email || !contact || !linkedProf || !resumeFile) {
      return res.json({
        success: false,
        message: "Missing required fields."
      });
    }

    // 🔎 Duplicate Check
    const exists = await Referral.findOne({
      $or: [{ email }, { contact }]
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Duplicate referral"
      });
    }

    const fileBuffer = fs.readFileSync(resumeFile.path)

    // Upload image to imageKit
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: resumeFile.originalname,
      folder: "/Hiring_Platform"
    })

    // Optimization through imageKit URL transformation
    const optimizedImageUrl = imagekit.url({
      path: response.filePath,
      transformation: [
        { quality: 'auto' },  // Auto compression
        { format: 'webp' },   // Convert to modern format
        { width: '1280' }      // Width resizing
      ]
    })

    const resumeUrl = optimizedImageUrl;

    // 🔐 Generate Verification Token
    const token = crypto.randomBytes(32).toString("hex");

    // 🔎 Check if candidate already exists
    const existingCandidate = await User.findOne({ email });

    let candidateId = null;

    if (existingCandidate) {
      candidateId = existingCandidate._id;
    }

    // 📝 Create Referral
    const referral = await Referral.create({
      name,
      email,
      contact,
      experience,
      currComp,
      linkedProf,
      resumeUrl,
      referrerId: req.user._id,
      candidateId,
      verificationToken: token,
      tokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      status: "pending"
    });

    // 📧 Send Proper Email
    if (existingCandidate) {
      await sendVerificationEmail(email, token);
    } else {
      await sendRegisterEmail(email, token);
    }

    res.status(201).json({
      success: true,
      message: existingCandidate
        ? "Referral submitted. Verification email sent."
        : "Referral submitted. Registration email sent.",
      referral
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllReferrals = async (req, res) => {
  try {
    const referrals = await Referral.find({})
      .sort({ createdAt: -1 });

    res.json({ success: true, referrals });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyCandidate = async (req, res) => {
  try {
    const { token } = req.params;

    const referral = await Referral.findOne({
      verificationToken: token,
      tokenExpiry: { $gt: Date.now() }
    });

    if (!referral) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired link"
      });
    }

    return res.json({
      success: true,
      candidateId: referral.candidateId,
      token
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const completeReferral = async (req, res) => {
  try {
    const { token } = req.params;
    const { skills, experience, currComp } = req.body;

    const referral = await Referral.findOne({
      verificationToken: token,
      tokenExpiry: { $gt: Date.now() }
    });

    if (!referral) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    // Optional resume re-upload
    if (req.file) {
      const resumeFile = req.file;
      const fileBuffer = fs.readFileSync(resumeFile.path)

      // Upload image to imageKit
      const response = await imagekit.upload({
        file: fileBuffer,
        fileName: resumeFile.originalname,
        folder: "/Hiring_Platform"
      })

      // Optimization through imageKit URL transformation
      const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
          { quality: 'auto' },  // Auto compression
          { format: 'webp' },   // Convert to modern format
          { width: '1280' }      // Width resizing
        ]
      })

      referral.resumeUrl = optimizedImageUrl;
    }

    referral.skills = skills
  ? skills.split(",")
      .map(skill => skill.trim().toLowerCase())
  : [];
    referral.experience = experience;
    referral.currComp = currComp;
    referral.status = "verified";

    referral.verificationToken = undefined;
    referral.tokenExpiry = undefined;

    await referral.save();

    res.json({
      success: true,
      message: "Referral verified successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const getReferralByToken = async (req, res) => {
  try {
    const { token } = req.params;

    const referral = await Referral.findOne({
      verificationToken: token,
      tokenExpiry: { $gt: Date.now() }
    });

    if (!referral) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token"
      });
    }

    res.json({
      success: true,
      referral
    });

  } catch (error) {
    res.status(500).json({ success: false });
  }
};


export const filterReferrals = async (req, res) => {
  try {

    const referrals = await Referral.find({
      status: "verified"
    });

    const actions = await RecruiterAction.find({
      recruiterId: req.user._id
    });

    const actionMap = {};

    actions.forEach(action => {
      actionMap[action.referralId] = action.decision;
    });

    const enrichedReferrals = referrals.map(ref => ({
      ...ref._doc,
      myDecision: actionMap[ref._id] || null
    }));

    res.json({
      success: true,
      referrals: enrichedReferrals
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updateReferralStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const referral = await Referral.findById(id);

    if (!referral) {
      return res.status(404).json({
        success: false,
        message: "Referral not found"
      });
    }

    referral.status = status;
    await referral.save();

    res.json({
      success: true,
      message: "Status updated successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};








