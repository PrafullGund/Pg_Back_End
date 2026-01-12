const dbConnection = require('../config/connection');

const getByIdVendorsService = async (vendorsId) => {
    const [result] = await dbConnection.query('SELECT * FROM vendors WHERE id=?', [vendorsId]);
    return result;
}

const updateEditProfileVendorsService = async (vendorsId, vendorsData) => {

    if (!vendorsData.vendorName) throw new Error('Vendor name is required');
    if (!vendorsData.pgName) throw new Error('PG name is required');
    if (!/^\d{10}$/.test(vendorsData.contactNumber)) throw new Error('Invalid contact number');
    if (!/^\d{10}$/.test(vendorsData.whatsappNumber)) throw new Error('Invalid WhatsApp number');
    if (!vendorsData.vendorsEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(vendorsData.vendorsEmail)) {
        throw new Error('Invalid email address');
    }
    if (!vendorsData.addressLine1) throw new Error('Address Line 1 is required');
    if (!vendorsData.city) throw new Error('City is required');
    if (!/^\d{6}$/.test(vendorsData.pinCode)) throw new Error('Invalid pin code');
    if (!['Male', 'Female', 'Other'].includes(vendorsData.gender)) throw new Error('Invalid gender');

    const numberFields = [
        'totalRooms', 'acRooms', 'acRoomBeds', 'acRoomBedPrice',
        'nonAcRooms', 'nonAcRoomBeds', 'nonAcRoomBedPrice'
    ];
    numberFields.forEach(field => {
        if (vendorsData[field] === undefined || isNaN(Number(vendorsData[field]))) {
            throw new Error(`${field} must be a valid number`);
        }
    });

    const convertToBoolean = (val) => {
        return val === 'Yes' || val === true || val === 'true' ? true : false;
    };

    const vendors = {
        vendorName: vendorsData.vendorName,
        pgName: vendorsData.pgName,
        contactNumber: vendorsData.contactNumber,
        whatsappNumber: vendorsData.whatsappNumber,
        vendorsEmail: vendorsData.vendorsEmail,
        addressLine1: vendorsData.addressLine1,
        addressLine2: vendorsData.addressLine2,
        landmark: vendorsData.landmark,
        city: vendorsData.city,
        pinCode: vendorsData.pinCode,
        gender: vendorsData.gender,

        totalRooms: vendorsData.totalRooms,

        acRooms: vendorsData.acRooms,
        acRoomBeds: vendorsData.acRoomBeds,
        acRoomBedPrice: vendorsData.acRoomBedPrice,

        nonAcRooms: vendorsData.nonAcRooms,
        nonAcRoomBeds: vendorsData.nonAcRoomBeds,
        nonAcRoomBedPrice: vendorsData.nonAcRoomBedPrice,

        pgImage: vendorsData.pgImage,

        hotWater: convertToBoolean(vendorsData.hotWater),
        broadBandFacility: convertToBoolean(vendorsData.broadBandFacility),
        gym: convertToBoolean(vendorsData.gym),
        library: convertToBoolean(vendorsData.library),
        meal: vendorsData.meal
    }

    const [result] = await dbConnection.query(
        'UPDATE vendors SET ? WHERE id=? ',
        [vendors, vendorsId]
    );
    return result;
}

const updateKycVendorsService = async (vendorsId, vendorsData) => {

    if (!vendorsData.pgLicenseNumber || vendorsData.pgLicenseNumber.trim() === '') {
        throw new Error('PG License Number is required');
    }

    if (!vendorsData.pgLicenseImage || vendorsData.pgLicenseImage.trim() === '') {
        throw new Error('PG License Image is required');
    }

    if (!/^\d{12}$/.test(vendorsData.aadharNumber)) {
        throw new Error('Aadhar Number must be a 12-digit number');
    }

    if (!vendorsData.aadharCardImg || vendorsData.aadharCardImg.trim() === '') {
        throw new Error('Aadhar Card Image is required');
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panRegex.test(vendorsData.panCardNumber)) {
        throw new Error('PAN Card Number is invalid (e.g., ABCDE1234F)');
    }

    if (!vendorsData.panCardImg || vendorsData.panCardImg.trim() === '') {
        throw new Error('PAN Card Image is required');
    }

    const vendors = {
        pgLicenseNumber: vendorsData.pgLicenseNumber,
        pgLicenseImage: vendorsData.pgLicenseImage,
        aadharNumber: vendorsData.aadharNumber,
        aadharCardImg: vendorsData.aadharCardImg,
        panCardNumber: vendorsData.panCardNumber,
        panCardImg: vendorsData.panCardImg
    }

    const [result] = await dbConnection.query(
        'UPDATE vendors SET ? WHERE id=?',
        [vendors, vendorsId]
    );
    return result;
}

module.exports = {
    getByIdVendorsService,
    updateEditProfileVendorsService,
    updateKycVendorsService
}