const Comment = require('../../../models/Comment');

module.exports = async (req, res) => {
  const postId = req.params.postId;

  const comments = await Comment.show(postId);
  res.json(comments);
}