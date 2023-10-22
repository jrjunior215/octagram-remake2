const Category = require('../../../models/Category');

module.exports = async (req, res) => {
    try {
        const category = await Category.admin_creator();
        res.json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
