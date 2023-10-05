const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  const data = req.body;
  await Creator.edit(data)
  res.redirect('/creator');
}