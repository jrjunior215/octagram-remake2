const Post = require('../../../models/Post');
const Member = require('../../../models/Member');
const Category = require('../../../models/Category');

module.exports = async (req, res) => {
  try {
    const id_creator = SESSION_USER.creator_id;
    const post = await Post.show(id_creator);
    const member = await Member.show(id_creator);
    const category = await Category.show(id_creator);

    res.locals.layout = 'creator/components/layout';
    res.render('creator/index/about', { title_nav: 'เกี่ยวกับ | Octagram', posts: post, members: member, categories : category })
  } catch (error) {
    res.redirect('/error');
  }
}
