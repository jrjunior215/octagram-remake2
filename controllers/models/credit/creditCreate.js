const Credit = require('../../../models/Credit');

module.exports = async (req, res) => {
    try {
        const data = req.body;
        await Credit.create(data);
        res.redirect('/payout');
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }
}
