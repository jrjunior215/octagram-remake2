const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const data = req.body;
  await Category.edit(data);
  res.redirect('/admin/category');
}