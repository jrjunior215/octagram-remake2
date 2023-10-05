const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const data = await req.query.creator_id;
  const category = await Category.show(data);
  res.json(category);
}