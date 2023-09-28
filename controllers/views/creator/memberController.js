module.exports = (req, res) => {
  res.locals.layout = 'creator/components/layout';
  res.render('creator/member/index', { title_nav: 'สมาชิก | Octagram' })
}