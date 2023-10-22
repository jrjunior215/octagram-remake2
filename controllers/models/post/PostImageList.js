const Post = require('../../../models/Post');

module.exports = async (req, res, next) => {
    try {
        const id_post = req.query.id_post;
        const image = await Post.image_list(id_post);
        res.json(image);
    } catch {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
