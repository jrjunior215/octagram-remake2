const Creator = require('../../../../models/Creator');
const Category = require('../../../../models/Category');
const Member = require('../../../../models/Member');
const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  try {
    const id_user = SESSION_USER.id;
    const id_creator = req.query.id_creator;

    const creator = await Creator.select(id_creator);
    const category = await Category.show(id_creator);
    const member_all = await Member.show(id_creator);
    const post_all = await Post.show(id_creator);
    const check = await Member.check2(id_creator, id_user);

    res.locals.layout = 'home/components/layout';
    res.render('home/creator/about', { title_nav: `${creator[0].creator_name} about | Octagram`, creators: creator, categories: category, members_all: member_all, posts_all: post_all, checks: check });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Adjust the error handling as needed
  }
}