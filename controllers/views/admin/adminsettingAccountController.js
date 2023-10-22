module.exports = (req, res) => {
  try {
    res.locals.layout = 'admin/components/layout';
    res.render('admin/setting/account', {title_nav: 'ตั้งค่า | Octagram'} )
  } catch (error) {
    res.redirect('/error');
  }
}