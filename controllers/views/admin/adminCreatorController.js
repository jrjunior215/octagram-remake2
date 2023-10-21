const Creator = require('../../../models/Creator');
const Package = require('../../../models/Package');
const Post = require('../../../models/Post');
const Member = require('../../../models/Member');

module.exports = async (req, res) => {
  const id_creator = req.query.id_creator;
  const creator = await Creator.select(id_creator);
  const package = await Package.list(id_creator);
  const post = await Post.show(id_creator);
  const member = await Member.show(id_creator);

  res.locals.layout = 'admin/components/layout';
  res.render('admin/creator/index', { title_nav: 'คริเอเตอร์ | Octagram', creators: creator, packages: package, posts: post, members: member })
}