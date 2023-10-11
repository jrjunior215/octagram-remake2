const Member = require('../../../models/Member');

module.exports = async (req, res) => {
    const id_creator = SESSION_USER.creator_id
    const member = await Member.list_creator(id_creator);
    res.json(member);
}