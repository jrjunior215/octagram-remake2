const Income = require('../../../models/Income');

module.exports = async (req, res) => {
    try {
        const income = await Income.octagram();
        res.json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
