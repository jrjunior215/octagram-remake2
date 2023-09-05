const Creator = require('../../../../models/Creator');
const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  const creator_name = req.params.creator_name;
  const creator = await Creator.page(creator_name);

  res.locals.layout = 'home/components/layout';
  res.render('home/creator/index', { creators: creator });
}