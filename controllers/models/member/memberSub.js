const Member = require('../../../models/Member')

module.exports = async (req, res) => {

  const id_user = SESSION_USER.id;

  const memberlists = await Member.sub(id_user);
  res.json(memberlists);

}