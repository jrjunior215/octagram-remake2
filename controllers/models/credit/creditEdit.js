const Credit = require('../../../models/Credit');

module.exports = async (req, res) => {
    const data = req.body;
    await Credit.edit(data)
    res.redirect('/payout');
}