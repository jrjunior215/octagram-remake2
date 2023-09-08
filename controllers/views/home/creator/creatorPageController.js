const Creator = require('../../../../models/Creator');
const Member = require('../../../../models/Member');
const Package = require('../../../../models/Package');
const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  const creator_name = req.params.creator_name;
  const creator = await Creator.page(creator_name);

  const id_creator = creator[0].id;
  const id_user = SESSION_USER.id;

  const post_all = await Post.show(id_creator,);

  await Member.check(id_creator, id_user).then(async (result) => {

    const permission = result[0].id_package;
    const post = await Post.show_check1(id_creator, permission);
    res.locals.layout = 'home/components/layout';
    res.render('home/creator/index', { title_nav: `${creator[0].creator_name} | Octagram`, creators: creator, checks: result, posts: post, posts_all: post_all });

  }).catch(async (error) => {

    const post = await Post.show_check2(id_creator);
    const package = await Package.list(id_creator);
    res.locals.layout = 'home/components/layout';
    res.render('home/creator/index', { title_nav: `${creator[0].creator_name} | Octagram`, creators: creator, checks: error, packages: package, posts: post, posts_all: post_all });

  })

}