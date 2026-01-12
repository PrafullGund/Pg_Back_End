const bcrypt = require('bcrypt');
const dbConnection = require('../config/connection');
const sendEmail = require('../utils/sendEmail');

const postSignInService = async (phone, password) => {

  const [rows] = await dbConnection.query('SELECT * FROM users WHERE phone = ?', [phone]);

  if (rows.length === 0) {
    throw new Error('Invalid phone or password');
  }

  const user = rows[0];

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Invalid phone or password');
  }

  return user;
};

const forgotPasswordService = async (email) => {
  const [rows] = await dbConnection.query('SELECT * FROM users WHERE email = ?', [email]);

  if (rows.length === 0) {
    throw new Error('User not found with this email.');
  }

  const user = rows[0];

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  await dbConnection.query(
    'UPDATE users SET email_otp = ?, otp_expiration_time = ? WHERE id = ?',
    [otp, otpExpiry, user.id]
  );

  await sendEmail('forgotPassword', {
    name: user.name,
    email: user.email,
    otp: otp,
  });
  return { message: 'Email Send Successfully' }
}

const resetPasswordService = async ({ email, otp, newPassword }) => {
  const [rows] = await dbConnection.query(
    'SELECT * FROM users WHERE email = ? AND email_otp = ?',
    [email, otp]
  );

  if (rows.length === 0) {
    throw new Error('Invalid email or OTP.');
  }

  const user = rows[0];

  if (new Date(user.otp_expiration_time) < new Date()) {
    throw new Error('OTP has expired.');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await dbConnection.query(
    'UPDATE users SET password = ?, email_otp = NULL, otp_expiration_time = NULL WHERE id = ?',
    [hashedPassword, user.id]
  );

  return { message: 'Password reset successful.' };
};

module.exports = {
  postSignInService,
  forgotPasswordService,
  resetPasswordService
};