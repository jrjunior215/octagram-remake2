const Search = require('../../../models/Search')

module.exports = async (req, res, next) => {
    const data = await req.query.data_query;
    const search = await Search.find(data);
    res.json(search);
}