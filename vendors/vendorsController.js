const vendorsService = require('../vendors/vendorsService');

const getByIdVendorsController = async (req, res) => {
  try {
    const vendorsId = req.params.id;
    const result = await vendorsService.getByIdVendorsService(vendorsId);

    if (result.length === 0) {
      res.status(404).json({ success: false, message: 'Vendors Not Found' });
    } else {
      res.status(200).json({ success: true, data: result[0] });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

const updateEditProfileVendorsController = async (req, res) => {
  try {
    const vendorsId = req.params.id;
    let vendorsData = req.body;

    if (req.files && req.files.pgImage) {
      const pgImagePath = req.files.pgImage[0].path;
      vendorsData.pgImage = pgImagePath;
    }

    const result = await vendorsService.updateEditProfileVendorsService(vendorsId, vendorsData);

    if (result.affectedRows > 0) {
      res.status(201).json({ success: true, message: 'vendors updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'vendors not found' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateKycVendorsController = async (req, res) => {
  try {

    const vendorsId = req.params.id;

    const pgLicenseNumber = req.body.pgLicenseNumber;
    const aadharNumber = req.body.aadharNumber;
    const panCardNumber = req.body.panCardNumber

    const updateData = { pgLicenseNumber, aadharNumber, panCardNumber }

    if (req.files?.pgLicenseImage?.[0]) {
      updateData.pgLicenseImage = req.files.pgLicenseImage[0].filename;
    }

    if (req.files?.aadharCardImg?.[0]) {
      updateData.aadharCardImg = req.files.aadharCardImg[0].filename;
    }

    if (req.files?.panCardImg?.[0]) {
      updateData.panCardImg = req.files.panCardImg[0].filename;
    }

    const result = await vendorsService.updateKycVendorsService(vendorsId, updateData)

    if (result.affectedRows > 0) {
      res.status(200).json({ success: true, message: 'KYC Upload Successfully' });
    } else {
      res.status(404).json({ success: false, message: 'KYC No Upload' })
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getByIdVendorsController,
  updateEditProfileVendorsController,
  updateKycVendorsController
}