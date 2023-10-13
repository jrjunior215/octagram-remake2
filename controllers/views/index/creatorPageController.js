const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  const creator = await Creator.all_index();

  res.locals.layout = 'index/components/layout';
  res.render('index/creator/index', {creator: creator});
}