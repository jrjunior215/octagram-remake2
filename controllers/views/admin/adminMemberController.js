module.exports = (req, res) => {
    res.locals.layout = 'admin/components/layout';
    res.render('admin/member/index', { title_nav: 'Member | Octagram' })
  }