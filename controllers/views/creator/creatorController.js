const User = require('../../../models/User');
const Post = require('../../../models/Post');

module.exports = async (req, res) => {
  const role = SESSION_USER.role;
  const id_user = SESSION_USER.id;

  if (role === "USER") {
    res.locals.layout = 'creator/new_creator/layout';
    res.render('creator/new_creator/index', { title_nav: 'Home | Octagram' })
  } else if (role === "CREATOR") {
    const creator_name = SESSION_USER.creator_name;
    const id_creator = SESSION_USER.creator_id;

    const post = await Post.show(id_creator);
    res.locals.layout = 'creator/components/layout';
    res.render('creator/index/index', { title_nav: `${creator_name} | Octagram`, posts: post })
  }

}