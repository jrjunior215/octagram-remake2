const Post = require('../../../models/Post');

module.exports = async (req, res) => {
    try {
        const id_user = SESSION_USER.id;
        const post = await Post.feed(id_user);

        res.locals.layout = 'home/components/layout';
        res.render('home/index/index', { title_nav: 'หน้าหลัก | Octagram', posts: post })
    } catch (error) {
        res.redirect('/error');
    }
}