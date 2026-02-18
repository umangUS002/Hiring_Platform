import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import Referral from "../models/Referral.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Not Found"
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials"
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role, token } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "Seeker"
    });

    // If registration via referral token
    if (token) {

      const referral = await Referral.findOne({
        verificationToken: token,
        tokenExpiry: { $gt: Date.now() }
      });

      if (referral) {
        // Only link candidate
        referral.candidateId = user._id;
        await referral.save();
      }
    }

    const jwtToken = generateToken(user._id);

    res.status(201).json({
      success: true,
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
