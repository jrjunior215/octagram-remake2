const Credit = require('../../../models/Credit');

module.exports = async (req, res) => {
    const data = req.body;
    await Credit.create(data)
    res.redirect('/payout');
}