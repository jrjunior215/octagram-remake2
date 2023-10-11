const Income = require('../../../models/Income');

module.exports = async (req, res) => {
    const id_creator = SESSION_USER.creator_id
    const income = await Income.select_creator(id_creator);
    res.json(income);
}