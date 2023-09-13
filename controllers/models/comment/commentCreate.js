const Comment = require('../../../models/Comment');

module.exports = async (req, res) => {
    const data = req.body;
    const { callback } = data;

    await Comment.create_user(data);
    res.redirect(`/${callback}`);
}