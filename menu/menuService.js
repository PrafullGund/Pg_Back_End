const dbConnection = require('../config/connection');

const postMenuService = async (menuData) => {
    const menu = 'INSERT INTO menu (date,type,menu) VALUES (?,?,?)';
    const [result] = await dbConnection.query(menu,
        [
            menuData.date,
            menuData.type,
            menuData.menu
        ]
    );
    return result;
}

const getAllMenuService = async () => {
    const [result] = await dbConnection.query('SELECT * FROM menu');
    return result;
}

const getMenuByDateService = async (date) => {
    const [result] = await dbConnection.query(
        'SELECT * FROM menu WHERE date=?',
        [date]
    );
    return result;
}

const updateMenuService = async (menuId, menuData) => {
    const menu = {
        date: menuData.date,
        type: menuData.type,
        menu: menuData.menu
    }

    const [result] = await dbConnection.query(
        'UPDATE menu SET ? WHERE id=?',
        [menu, menuId]
    );
    return result;
}

module.exports = {
    postMenuService,
    getAllMenuService,
    getMenuByDateService,
    updateMenuService
}
