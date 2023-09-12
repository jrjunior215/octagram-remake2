const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  const data = req.query.post;

  await Post.delete(data);
  res.redirect('/creator');

}