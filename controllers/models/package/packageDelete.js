const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  const data = req.query.id

  await Package.delete(data);
  await res.redirect('/package');

}