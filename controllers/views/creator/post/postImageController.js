const Package = require('../../../../models/Package');

module.exports = async (req, res) => {
    const id_creator = SESSION_USER.creator_id;
    const package = await Package.list(id_creator);

    res.locals.layout = 'creator/components/layout';
    res.render('creator/post/image', { title_nav: 'สร้างโพสต์ | Octagram', packages: package })
}