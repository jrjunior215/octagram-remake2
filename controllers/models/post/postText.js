// const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  const data = req.body;
  console.log(data);

  res.redirect('/post/text');

}