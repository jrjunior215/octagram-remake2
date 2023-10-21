const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const memberlist = await Member.dashboard();
    res.json(memberlist);

}