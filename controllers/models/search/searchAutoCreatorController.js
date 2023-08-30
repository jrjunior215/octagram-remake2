const Creator = require('../../../models/Creator')

module.exports = async (req, res, next) => {
    const data = req.query.data_query;
    const search = await Creator.find(data)
    res.json(search);
}