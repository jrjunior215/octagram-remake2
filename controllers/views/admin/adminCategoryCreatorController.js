module.exports = (req, res) => {
  try {
    res.locals.layout = 'admin/components/layout';
    res.render('admin/category/creator', { title_nav: 'หมวดหมู่ | Octagram' })
  } catch (error) {
    res.redirect('/error');
  }
}
