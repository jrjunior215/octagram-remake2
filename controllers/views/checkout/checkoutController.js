module.exports = (req, res) => {
  res.locals.layout = 'home/components/layout';
  res.render('home/checkout/index', { title_nav: 'Dashboard | Octagram' })
}