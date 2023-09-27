const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const memberlist = await Member.admin();
    res.json(memberlist);

}