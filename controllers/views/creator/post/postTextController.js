const Package = require('../../../../models/Package');

module.exports = async (req, res) => {
  try {
    const id_creator = SESSION_USER.creator_id;
    const package = await Package.list(id_creator);

    res.locals.layout = 'creator/components/layout';
    res.render('creator/post/text', { title_nav: 'สร้างโพสต์ | Octagram', packages: package })
  } catch (error) {
    res.redirect('/error');
  }
}
