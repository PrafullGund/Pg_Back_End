const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/kycDocuments');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, and PNG images are allowed'), false);
  }
};

const kycUpload = multer({ storage, fileFilter }).fields([
  { name: 'aadharCardImg', maxCount: 1 },
  { name: 'panCardImg', maxCount: 1 },
  { name: 'pgImage', maxCount: 1 },
  { name: 'pgLicenseImage', maxCount: 1 }
]);

module.exports = kycUpload;
