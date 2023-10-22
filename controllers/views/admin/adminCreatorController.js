const Creator = require('../../../models/Creator');
const Package = require('../../../models/Package');
const Post = require('../../../models/Post');
const Member = require('../../../models/Member');

module.exports = async (req, res) => {
  try {
    const id_creator = req.query.id_creator;
    const creator = await Creator.select(id_creator);
    const packages = await Package.list(id_creator);
    const posts = await Post.show(id_creator);
    const members = await Member.show(id_creator);

    res.locals.layout = 'admin/components/layout';
    res.render('admin/creator/index', { title_nav: 'คริเอเตอร์ | Octagram', creators: creator, packages, posts, members })
  } catch (error) {
    res.redirect('/error');
  }
}
