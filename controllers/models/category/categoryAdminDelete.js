const Category = require('../../../models/Category');

module.exports = async (req, res) => {
    try {
        const id_category = req.query.id_category;
        await Category.delete(id_category);
        res.redirect('/admin/category');
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
}
