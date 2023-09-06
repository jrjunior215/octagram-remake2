const Creator = require('../../../../models/Creator');
const Member = require('../../../../models/Member');
const Package = require('../../../../models/Package');
const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  const creator_name = req.params.creator_name;
  const creator = await Creator.page(creator_name);

  const id_creator = creator[0].id;
  const id_user = SESSION_USER.id;

  const check = await Member.check(id_creator, id_user);
  const package = await Package.list(id_creator);

  const id_package = await check[0].id_package;
  
  let post = {};

  if (!checks) {
    post = await Post.creator1(id_creator);
  } else {
    post = await Post.creator2(id_creator, id_package);
  }

  res.locals.layout = 'home/components/layout';
  res.render('home/creator/index', { title_nav: `${creator[0].creator_name} | Octagram`, creators: creator, checks: check, packages: package, posts: post  });
}