module.exports = (req, res) => {
  try {
    res.locals.layout = 'auth/components/layout';
    res.render('auth/login', {title_nav: 'Sign in | Octagram'})
  } catch (error) {
    res.redirect('/error');
  }
}