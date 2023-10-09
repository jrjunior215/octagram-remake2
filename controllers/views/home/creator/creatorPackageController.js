const Creator = require('../../../../models/Creator');
const Member = require('../../../../models/Member');
const Package = require('../../../../models/Package');
const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  try {
    const id_user = SESSION_USER.id;
    const id_creator = req.query.id_creator;

    const creator = await Creator.select(id_creator);
    const member_all = await Member.show(id_creator);
    const post_all = await Post.show(id_creator);
    const package = await Package.list(id_creator);
    const check = await Member.check2(id_creator, id_user);

    res.locals.layout = 'home/components/layout';
    res.render('home/creator/package', { title_nav: `${creator[0].creator_name} package | Octagram`, creators: creator, members_all: member_all, posts_all: post_all, packages: package, checks: check });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Adjust the error handling as needed
  }
}