const Creator = require('../../../models/Creator');
const Member = require('../../../models/Member');
const Package = require('../../../models/Package');
const Post = require('../../../models/Post');

module.exports = async (req, res) => {
  const creator_name = req.params.creator_name;
  const creator = await Creator.page(creator_name);
  const id_creator = creator[0].id;

  const member_all = await Member.show(id_creator);
  const post_all = await Post.show(id_creator);
  const post = await Post.show_list_all(id_creator);
  const package = await Package.list(id_creator);

  res.locals.layout = 'index/components/layout';
  res.render('index/creator/page', { creators: creator, posts_all: post_all, members_all: member_all, posts: post, packages: package  });
  
}