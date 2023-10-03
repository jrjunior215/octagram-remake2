const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const data = await req.query.data_query;
  const search = await Category.find(data);
  res.json(search);
}