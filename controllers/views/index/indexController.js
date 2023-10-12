const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  const creator = await Creator.all();

  res.locals.layout = 'index/components/layout';
  res.render('index/index/index', {creator: creator});
}