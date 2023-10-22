const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Member = require('../../../models/Member');
const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  try {
    const role = SESSION_USER.role;
    const id_user = SESSION_USER.id;

    if (role === "USER") {
      res.locals.layout = 'creator/new_creator/layout';
      res.render('creator/new_creator/index', { title_nav: 'สมัครเป็นคริเอเตอร์ | Octagram' })
    } else if (role === "CREATOR") {
      const creator_name = SESSION_USER.creator_name;
      const id_creator = SESSION_USER.creator_id;

      const post = await Post.show(id_creator);
      const member = await Member.show(id_creator);
      const creator = await Creator.select(id_creator);
      res.locals.layout = 'creator/components/layout';
      res.render('creator/index/index', { title_nav: `${creator_name} | Octagram`, posts: post, members: member, creators: creator })
    }
  } catch (error) {
    res.redirect('/error');
  }
}
