module.exports = (req, res) => {
    res.locals.layout = 'admin/components/layout';
    res.render('admin/category/creator', { title_nav: 'หมวดหมู่ | Octagram' })
  }