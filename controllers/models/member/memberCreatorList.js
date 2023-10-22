const Member = require('../../../models/Member');

module.exports = async (req, res) => {
    try {
        const id_package = req.params.id_package;
        const members = await Member.list(id_package);
        res.json(members);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
