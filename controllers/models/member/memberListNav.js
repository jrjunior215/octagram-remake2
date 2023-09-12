const Member = require('../../../models/Member')

module.exports = async (req, res) => {

    const id_user = SESSION_USER.id;
    const membership = await Member.navbar(id_user);
    res.json(membership);

}