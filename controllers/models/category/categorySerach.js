const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  try {
    const data = await req.query.data_query;
    const search = await Category.find(data);
    res.json(search);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
