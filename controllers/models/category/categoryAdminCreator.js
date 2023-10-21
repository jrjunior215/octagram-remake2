const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const category = await Category.admin_creator();
  res.json(category);
}