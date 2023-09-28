const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const category = await Category.admin();
  res.json(category);
}