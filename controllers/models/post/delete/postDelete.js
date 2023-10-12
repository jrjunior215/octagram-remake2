const Post = require('../../../../models/Post');
const Comment = require('../../../../models/Comment');


module.exports = async (req, res) => {
  const data = req.query.post;

  await Comment.delete_post(data);
  await Post.delete_image(data);
  await Post.delete(data);
  res.redirect('/creator');

}