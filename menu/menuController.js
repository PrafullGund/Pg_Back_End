const menuService = require('../menu/menuService');

const postMenuController = async (req, res) => {
    try {

        const menu = await menuService.postMenuService(req.body);
        res.status(201).json({ success: true, message: 'Menu Added Successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getAllMenuController = async (req, res) => {
    try {

        const result = await menuService.getAllMenuService();
        res.status(200).json({ success: true, data: result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const getMenuByDateController = async (req, res) => {
    try {

        const menuDate = req.params.date;
        const result = await menuService.getMenuByDateService(menuDate);

        if (result.length > 0) {
            res.status(200).json({ success: true, data: result });
        } else {
            res.status(404).json({ success: false, message: 'No menu found for the given date' })
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

const updateMenuController = async (req, res) => {
    try {
        const menuId = req.params.id;
        const menuData = req.body;
        const result = await menuService.updateMenuService(menuId, menuData);

        if (result.affectedRows > 0) {
            res.status(201).json({ success: true, message: 'Menu Update Successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Menu Not Found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

module.exports = {
    postMenuController,
    getAllMenuController,
    getMenuByDateController,
    updateMenuController
}