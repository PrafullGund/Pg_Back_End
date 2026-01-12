const jwt = require('jsonwebtoken');
const signInService = require('../auth/signInService');

const postSignInController = async (req, res) => {
  try {

    const { phone, password } = req.body;
    const user = await signInService.postSignInService(phone, password);

    const token = jwt.sign(
      {
        userId: user.id,
        phone: user.phone,
        role: user.role
      },
      process.env.JWT_SECRET || 'pg',
      { expiresIn: '1d' }
    );

    res.status(200).json({ success: true, message: 'Login Successfully', token, role: user.role });

  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: error.message });
  }
}

const postForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await signInService.forgotPasswordService(email);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const postResetPasswordController = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const result = await signInService.resetPasswordService({ email, otp, newPassword });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = {
  postSignInController,
  postForgotPasswordController,
  postResetPasswordController
}