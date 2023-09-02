const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  const id_package = req.query.package;
  const package = await Package.select(id_package);

  res.locals.layout = 'creator/components/layout';
  res.render('creator/package/edit', { title_nav: 'แก้ไขแพ็กเกจ | Octagram', packages: package })
}