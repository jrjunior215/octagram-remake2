const Comment = require('../../../models/Comment');

module.exports = async (req, res) => {
    const id_comment = req.query.id_comment;
    const callback = req.query.callback;
    const role = req.query.role;

    if (role === "USER") {
        await Comment.delete(id_comment);
        res.redirect(`/${callback}`);
    } else if (role === "CREATOR") {
        await Comment.delete(id_comment);
        res.redirect(`/${callback}`);
    } else {
        res.redirect(`/${callback}`);
    }

}