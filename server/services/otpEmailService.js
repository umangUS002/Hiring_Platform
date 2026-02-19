// services/emailService.js

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendOtpEmail = async (email, otp) => {
    await transporter.sendMail({
        from: `"Pick Your Hire" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your One-Time Login Code",
        html: `
      <div style="margin:0;padding:0;background-color:#f4f6f9;font-family:Arial,Helvetica,sans-serif;">
        
        <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:#2563eb;padding:20px;text-align:center;">
              <h2 style="color:#ffffff;margin:0;font-weight:600;">
                Pick Your Hire
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px 40px;color:#333333;">
              
              <h3 style="margin-top:0;font-size:20px;">
                Your Login Verification Code
              </h3>

              <p style="font-size:14px;line-height:1.6;color:#555;">
                Use the following One-Time Password (OTP) to securely log in to your account.
              </p>

              <!-- OTP Box -->
              <div style="margin:30px 0;text-align:center;">
                <span style="
                  display:inline-block;
                  padding:15px 30px;
                  font-size:28px;
                  letter-spacing:6px;
                  font-weight:bold;
                  color:#2563eb;
                  background:#f1f5ff;
                  border-radius:8px;
                  border:1px solid #dbeafe;
                ">
                  ${otp}
                </span>
              </div>

              <p style="font-size:13px;color:#777;">
                ⏳ This code will expire in <strong>5 minutes</strong>.
              </p>

              <p style="font-size:13px;color:#777;">
                If you did not request this code, please ignore this email. 
                Your account remains secure.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px;text-align:center;font-size:12px;color:#888;">
              © ${new Date().getFullYear()} Pick Your Hire. All rights reserved.
            </td>
          </tr>

        </table>
      </div>
    `
    });
};

