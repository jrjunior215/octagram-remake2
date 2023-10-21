module.exports = async (req, res) => {

  res.locals.layout = 'admin/components/layout';
  res.render('admin/report/index', { title_nav: 'รายงาน | Octagram' });

}