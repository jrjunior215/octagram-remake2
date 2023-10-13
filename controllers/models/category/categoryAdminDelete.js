const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const id_category = req.query.id_category;
  await Category.delete(id_category);
  res.redirect('/admin/category');
}