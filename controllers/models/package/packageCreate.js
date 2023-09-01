const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  const data = req.body

  await Package.create(data);
  res.redirect('/package');

}