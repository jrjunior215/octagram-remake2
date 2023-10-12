const Post = require('../../../models/Post')

module.exports = async (req, res, next) => {
    const id_post = await req.query.id_post;
    const iamge = await Post.image_list(id_post);
    res.json(iamge);
}