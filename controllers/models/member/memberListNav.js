const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const id_user = SESSION_USER.id;
    const memberlist = await Member.navbar(id_user);
    // console.log(memberlist);
    res.json(memberlist);

}