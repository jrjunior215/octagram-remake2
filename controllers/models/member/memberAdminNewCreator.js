const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const memberlist = await Member.admin_new_creator();
    res.json(memberlist);

}