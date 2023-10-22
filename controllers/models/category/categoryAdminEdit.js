const Category = require('../../../models/Category');

module.exports = async (req, res) => {
    try {
        const data = req.body;
        await Category.edit(data);
        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
}
