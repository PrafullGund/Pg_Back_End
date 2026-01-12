const express = require('express');
const router = express.Router();
const menuController = require('../menu/menuController');

router.post('/menu', menuController.postMenuController);
router.get('/menu', menuController.getAllMenuController);
router.get('/menu/:date', menuController.getMenuByDateController);
router.put('/menu/:id', menuController.updateMenuController);

module.exports = router;