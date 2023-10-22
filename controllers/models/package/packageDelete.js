const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  try {
    const data = req.query.id;
    await Package.delete(data);
    res.redirect('/package');
  } catch (error) {
    res.redirect('/error');
  }
}
