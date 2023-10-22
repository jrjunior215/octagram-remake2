const Income = require('../../../models/Income');

module.exports = async (req, res) => {
    try {
        const id_creator = SESSION_USER.creator_id; // Assuming SESSION_USER is defined somewhere in your code
        const income = await Income.select_creator(id_creator);
        res.json(income);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
