module.exports = async (req, res) => {
  try {
    res.locals.layout = 'admin/components/layout';
    res.render('admin/report/index', { title_nav: 'รายงาน | Octagram' });
  } catch (error) {
    res.redirect('/error');
  }
}
