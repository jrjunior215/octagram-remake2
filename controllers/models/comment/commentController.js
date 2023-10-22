const Comment = require('../../../models/Comment');

module.exports = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.show(postId);
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
