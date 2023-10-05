const Member = require('../../../models/Member');

module.exports = async (req, res) => {
  const id_package = req.params.id_package;

  const members = await Member.list(id_package);
  res.json(members);
}