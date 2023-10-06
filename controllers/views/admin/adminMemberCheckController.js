const Creator = require('../../../models/Creator')

module.exports = async (req, res) => {
  const id_creator = req.query.id_creator;
  const creator = await Creator.select(id_creator);

  res.locals.layout = 'admin/components/layout';
  res.render('admin/member/check', { title_nav: 'ผู้สมัครคริเอเตอร์ | Octagram', creators: creator })
}