module.exports = (req, res) => {
  res.locals.layout = 'admin/components/layout';
  res.render('admin/member/creator', { title_nav: 'คริเอเตอร์ | Octagram' })
}