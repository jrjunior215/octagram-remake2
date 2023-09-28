const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const data = req.body;
  await Category.create(data);
  res.redirect('/admin/category');
}