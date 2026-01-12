const { validatePassword } = require('../utils/validators');
const userService = require('../user/userService');
const bcrypt = require('bcrypt');

const postUserController = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    const validationResult = validatePassword(password);
    if (!validationResult.isValid) {
      return res.status(400).json({ success: false, message: validationResult.message });
    }

    const users = await userService.postUserService({ name, phone, email, password, role });

    res.status(201).json({ success: true, message: 'Sign Up Successfully', data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.id;

    const result = await userService.getUserByIdService(userId);

    if (result.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: result[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const updateUserController = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;

    if (req.file) {
      data.userProfile = req.file.filename;
    }

    const result = await userService.updateUserService(userId, data);

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'User updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const changePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.userId;

    const result = await userService.getUserByIdService(userId);
    const user = result[0];

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userService.updatePasswordService(userId, hashedPassword);

    res.status(200).json({ success: true, message: 'Password updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

const updateKycDetailsController = async (req, res) => {
  try {
    const userId = req.params.id;

    const aadharNumber = req.body.aadharNumber;
    const panCardNumber = req.body.panCardNumber;

    const updateData = {
      aadharNumber,
      panCardNumber,
    };

    if (req.files?.aadharCardImg?.[0]) {
      updateData.aadharCardImg = req.files.aadharCardImg[0].filename;
    }

    if (req.files?.panCardImg?.[0]) {
      updateData.panCardImg = req.files.panCardImg[0].filename;
    }

    const result = await userService.updateKycDetailsService(userId, updateData);

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'Documents uploaded successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  postUserController,
  getUserByIdController,
  updateUserController,
  changePasswordController,
  updateKycDetailsController
};
