const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const id_creator = SESSION_USER.creator_id;
    const memberlist = await Member.creator(id_creator);
    res.json(memberlist);

}