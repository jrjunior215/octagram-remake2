module.exports = (req, res) => {
  try {
    res.locals.layout = 'home/components/layout';
    res.render('home/setting/account', {title_nav: 'ตั้งค่า | Octagram'} );
  } catch (error) {
    res.redirect('/error');
  }
}
