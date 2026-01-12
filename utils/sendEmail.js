const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (template, { name, email, otp }) => {
  const subject = "Your OTP for Password Reset";
  const html = `
    <p>Hello ${name},</p>
    <p>Your OTP is: <strong>${otp}</strong></p>
    <p>This will expire in 10 minutes.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html,
  });
};

module.exports = sendEmail;