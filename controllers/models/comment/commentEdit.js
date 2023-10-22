const Comment = require('../../../models/Comment');

module.exports = async (req, res) => {
    try {
        const data = req.body;
        const { role } = data;
        const { callback } = data;

        if (role === "USER") {
            await Comment.edit(data);
            res.redirect(`/${callback}`);
        } else if (role === "CREATOR") {
            await Comment.edit(data);
            res.redirect(`/${callback}`);
        } else {
            res.redirect(`/${callback}`);
        }
    } catch (error) {
        console.error(error);
        res.redirect('/error');
    }

}