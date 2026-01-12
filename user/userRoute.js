const express = require('express');
const router = express.Router();
const profileEdit = require('../middleware/profileEdit');
const signInController = require('../auth/signInController');
const userController = require('../user/userController');
const authenticate = require('../middleware/authMiddleware');
const kycUploadMiddleware = require('../middleware/kycUploadMiddleware');

router.post('/signIn', signInController.postSignInController);
router.post('/forgot-password', signInController.postForgotPasswordController);
router.post('/reset-password', signInController.postResetPasswordController);

router.post('/registration', userController.postUserController);
router.get('/getByIdUser/:id', userController.getUserByIdController);
router.put('/userUpdateProfile/:id', profileEdit.single('userProfile'), userController.updateUserController);
router.put('/changePassword', authenticate, userController.changePasswordController);

router.put('/kycDocumentsUpdate/:id', kycUploadMiddleware, userController.updateKycDetailsController);

module.exports = router;