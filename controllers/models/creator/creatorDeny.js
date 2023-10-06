const Creator = require('../../../models/Creator');
const User = require('../../../models/User');
const Category = require('../../../models/Category');

module.exports = async (req, res) => {
  const id_creator = req.query.id_creator;
  const id_user = req.query.id_user;

  await Category.reset(id_creator);
  await Creator.deny(id_creator);
  await User.deny(id_user);

  res.redirect('/admin/members/reg_creator');
}