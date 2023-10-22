const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  try {
    const data = await req.query.creator_id;
    const category = await Category.show(data);
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
