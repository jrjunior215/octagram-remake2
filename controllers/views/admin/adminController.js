module.exports = (req, res) => {
  res.locals.layout = 'admin/components/layout';
  res.render('admin/index/index', { title_nav: 'Dashboard | Octagram' })
}