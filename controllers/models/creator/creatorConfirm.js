const Creator = require('../../../models/Creator')

module.exports = async (req, res) => {
  const id_creator = req.query.id_creator;
  await Creator.confirm(id_creator);

  res.redirect('/admin/members/creator');

}