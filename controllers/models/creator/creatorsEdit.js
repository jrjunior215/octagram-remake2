const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  try {
    const data = req.body;
    await Creator.edit(data);
    res.redirect('/creator');
  } catch (error) {
    res.redirect('/error');
  }
}
