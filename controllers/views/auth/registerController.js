module.exports = (req, res) => {
  try {
    res.locals.layout = 'auth/components/layout';
    res.render('auth/register', {title_nav: 'Sign up | Octagram'})
  } catch (error) {
    res.redirect('/error');
  }
}
