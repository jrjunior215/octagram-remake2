const Package = require('../../../../../models/Package');
const Post = require('../../../../../models/Post');

module.exports = async (req, res) => {
  try {
    const id_creator = SESSION_USER.creator_id;
    const id_post = req.query.post;

    const package = await Package.post_edit(id_creator);
    const post = await Post.post_edit_select(id_post);
    const post_img = await Post.image_list(id_post);

    res.locals.layout = 'creator/components/layout';
    res.render('creator/post/edit/text', { title_nav: 'แก้ไขโพสต์ | Octagram', packages: package, posts: post, posts_img: post_img })
  } catch (error) {
    res.redirect('/error');
  }
}
