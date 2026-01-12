const bcrypt = require('bcrypt');
const dbConnection = require('../config/connection');

const postUserService = async (signUpData) => {
  const hashedPassword = await bcrypt.hash(signUpData.password, 10);

  const insertUserQuery = `
    INSERT INTO users (name, phone, email, password, role)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [userResult] = await dbConnection.query(insertUserQuery, [
    signUpData.name,
    signUpData.phone,
    signUpData.email,
    hashedPassword,
    signUpData.role,
  ]);

  const userId = userResult.insertId;

  if (signUpData.role.toLowerCase() === 'vendor') {
    const insertVendorQuery = `
      INSERT INTO vendors (userId,vendorName)
      VALUES (?,?)
    `;

    await dbConnection.query(insertVendorQuery, [userId, signUpData.name]);
  }

  return { userId };
};

const getUserByIdService = async (userId) => {
  const [result] = await dbConnection.query('SELECT * FROM users WHERE id = ?', [userId]);
  return result;
};

const updateUserService = async (userId, userData) => {
  const convertToMysqlDate = (dateStr) => {
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }
    const [day, month, year] = dateStr.split('-');
    return `${year}-${month}-${day}`;
  };

  const user = {
    name: userData.name,
    phone: userData.phone,
    email: userData.email,
    userProfile: userData.userProfile,
    dateOfBirth: convertToMysqlDate(userData.dateOfBirth),
    gender: userData.gender
  };

  const [result] = await dbConnection.query(
    'UPDATE users SET ? WHERE id = ?',
    [user, userId]
  );
  return result;
};

const updatePasswordService = async (userId, hashedPassword) => {
  await dbConnection.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
};

const updateKycDetailsService = async (userId, userData) => {
  const { aadharNumber, aadharCardImg, panCardNumber, panCardImg } = userData;

  if (!/^\d{12}$/.test(aadharNumber)) {
    throw new Error('Aadhar number must be 12 digits');
  }

  if (!aadharCardImg || typeof aadharCardImg !== 'string') {
    throw new Error('Aadhar card image is required');
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(panCardNumber)) {
    throw new Error('PAN card number format is invalid (e.g., ABCDE1234F)');
  }

  if (!panCardImg || typeof panCardImg !== 'string') {
    throw new Error('PAN card image is required');
  }

  const kycDetails = {
    aadharNumber,
    aadharCardImg,
    panCardNumber,
    panCardImg,
  };

  const [result] = await dbConnection.query(
    'UPDATE users SET ? WHERE id = ?',
    [kycDetails, userId]
  );

  return result;
};

module.exports = {
  postUserService,
  getUserByIdService,
  updateUserService,
  updatePasswordService,
  updateKycDetailsService
};
