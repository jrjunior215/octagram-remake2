module.exports = (req, res) => {
  res.locals.layout = 'auth/components/layout';
  res.render('auth/login', {title_nav: 'Sign in | Octagram'})
}