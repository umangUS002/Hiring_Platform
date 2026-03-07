import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const emailTemplate = (title, message, buttonText, link) => {
  return `
  <div style="background:#f4f6fb;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
    
    <table align="center" width="600" cellpadding="0" cellspacing="0"
      style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 8px 20px rgba(0,0,0,0.08);">
      
      <tr>
        <td style="background:#4f46e5;color:white;padding:25px;text-align:center;">
          <h2 style="margin:0;">Pick Your Hire</h2>
        </td>
      </tr>

      <tr>
        <td style="padding:40px;text-align:center;">
          
          <h2 style="color:#111;margin-bottom:10px;">
            ${title}
          </h2>

          <p style="color:#555;font-size:16px;margin-bottom:30px;">
            ${message}
          </p>

          <a href="${link}"
            style="
              background:#4f46e5;
              color:white;
              padding:14px 28px;
              text-decoration:none;
              border-radius:8px;
              font-size:16px;
              font-weight:bold;
              display:inline-block;
            ">
            ${buttonText}
          </a>

          <p style="margin-top:25px;color:#888;font-size:13px;">
            If the button doesn't work, copy this link:
          </p>

          <p style="color:#4f46e5;font-size:13px;word-break:break-all;">
            ${link}
          </p>

        </td>
      </tr>

      <tr>
        <td style="background:#f9fafc;padding:20px;text-align:center;font-size:12px;color:#888;">
          © ${new Date().getFullYear()} Pick Your Hire • All rights reserved
        </td>
      </tr>

    </table>

  </div>
  `;
};

export const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/verify/${token}`;

  await transporter.sendMail({
    from: `"Pick Your Hire" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Referral",
    html: emailTemplate(
      "Verify Your Referral",
      "You were referred on Pick Your Hire. Click the button below to verify your email and continue.",
      "Verify Email",
      link
    )
  });
};

export const sendRegisterEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/register/${token}`;

  await transporter.sendMail({
    from: `"Pick Your Hire" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "You Were Referred – Create Account",
    html: emailTemplate(
      "You're Invited!",
      "Someone referred you to Pick Your Hire. Create your account and start exploring opportunities.",
      "Create Account",
      link
    )
  });
};