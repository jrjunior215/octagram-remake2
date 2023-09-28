module.exports = (req, res) => {
  res.locals.layout = 'admin/components/layout';
  res.render('admin/member/reg_creator', { title_nav: 'ผู้สมัครคริเอเตอร์ | Octagram' })
}