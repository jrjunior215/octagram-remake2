const Post = require('../../../../models/Post');

module.exports = async (req, res) => {
    try {
        const data = req.body;

        if (data.permission.includes('ALL')) {
            data.permission = ['ALL'];
        } else {
            data.permission = data.permission;
        }

        await Post.post_edit(data);
        res.redirect('/creator');
    } catch {
        res.redirect('/error');
    }
}
