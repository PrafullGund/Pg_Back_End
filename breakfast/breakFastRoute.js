const express = require('express');
const router = express.Router();
const breakFastController = require('../breakfast/breakFastController');

router.post('/breakFast', breakFastController.postBreakFastController);
router.get('/breakFast', breakFastController.getAllBreakFastController);

module.exports = router;