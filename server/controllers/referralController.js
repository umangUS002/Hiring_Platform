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
            fileName: imageFile.originalname,
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
        message: "Invalid or expired verification link"
      });
    }

    // If candidate already registered
    if (referral.candidateId) {
      referral.status = "Verified";
      referral.verificationToken = undefined;
      referral.tokenExpiry = undefined;
      await referral.save();

      return res.json({
        success: true,
        message: "Referral verified successfully"
      });
    }

    // If candidate not registered yet
    return res.json({
      success: true,
      needsRegistration: true,
      message: "Please register to complete verification"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



