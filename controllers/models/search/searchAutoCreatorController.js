const Search = require('../../../models/Search')

module.exports = async (req, res, next) => {
  try {
    const data = await req.query.data_query;
    const search = await Search.find(data);
    res.json(search);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
