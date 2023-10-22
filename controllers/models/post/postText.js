const Post = require('../../../models/Post');

module.exports = async (req, res) => {
  try {
    const data = req.body;

    if (data.permission.includes('ALL')) {
      data.permission = ['ALL'];
    } else {
      data.permission = data.permission;
    }

    await Post.text(data);
    res.redirect('/creator');
  } catch (error) {
    res.redirect('/error');
  }
}
