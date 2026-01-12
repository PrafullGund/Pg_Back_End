const express = require('express');
const router = express.Router();
const kycUploadMiddleware = require('../middleware/kycUploadMiddleware');
const vendorsController = require('../vendors/vendorsController');

router.get('/vendorsGetById/:id', vendorsController.getByIdVendorsController);
router.put('/vendorUpdateProfile/:id', kycUploadMiddleware, vendorsController.updateEditProfileVendorsController);
router.put('/kycVendorUpdate/:id', kycUploadMiddleware, vendorsController.updateKycVendorsController);

module.exports = router;
