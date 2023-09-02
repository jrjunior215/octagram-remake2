const Package = require('../../../models/Package');

module.exports = async (req, res) => {
    const id_creator = SESSION_USER.creator_id;
    const package = await Package.list(id_creator);

    res.locals.layout = 'creator/components/layout';
    res.render('creator/package/preview', { title_nav: 'ดูตัวอย่าง | Octagram', packages: package })
}