import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.VITE_FRONTEND_URL}/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Referral",
    html: `
      <h3>You were referred!</h3>
      <p>Click below to verify:</p>
      <a href="${link}">${link}</a>
    `
  });
};

export const sendRegisterEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/register/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "You Were Referred – Create Account",
    html: `
      <h3>You were referred on Pick Your Hire!</h3>
      <p>Please register first:</p>
      <a href="${link}">${link}</a>
    `
  });
};
