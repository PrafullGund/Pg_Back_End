const express = require('express');
const router = express.Router();
const dinnerController = require('../dinner/dinnerController');

router.post('/dinner', dinnerController.postDinnerController);
router.get('/dinner', dinnerController.getAllDinnerController);

module.exports = router;