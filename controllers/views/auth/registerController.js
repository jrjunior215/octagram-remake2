module.exports = (req, res) => {
  res.locals.layout = 'auth/components/layout';
  res.render('auth/register')
}