const Post = require('../../../models/Post');

module.exports = async (req, res) => {

    const id_user = SESSION_USER.id;
    const post = await Post.feed(id_user);

    res.locals.layout = 'home/components/layout';
    res.render('home/index/index', {title_nav: 'Home | Octagram', posts: post })
}