import express from 'express';
import { login, register, sendOtp, verifyOtp } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/login', login);
authRouter.post('/signup', register);

authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;