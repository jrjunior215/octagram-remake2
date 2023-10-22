const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  try {
    const data = req.body;
    await Package.create(data);
    res.redirect('/package');
  } catch (error) {
    res.redirect('/error');
  }
}
