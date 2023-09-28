const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const memberlist = await Member.admin_creator();
    res.json(memberlist);

}