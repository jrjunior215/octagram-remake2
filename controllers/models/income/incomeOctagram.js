const Income = require('../../../models/Income');

module.exports = async (req, res) => {
    const income = await Income.octagram();
    res.json(income);
}