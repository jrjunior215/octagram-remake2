const Income = require('../../../models/Income')

module.exports = async (req, res) => {

    const income = await Income.admin_creator();
    res.json(income);

}