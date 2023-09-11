const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
  const data = req.body;
  console.log(data);

  if (data.permission.includes('ALL')) {
    data.permission = ['ALL'];
  } else {
    data.permission = data.permission;
  }

  await Post.post_edit(data);
  res.redirect('/creator');

}