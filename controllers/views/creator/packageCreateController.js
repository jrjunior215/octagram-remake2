module.exports = (req, res) => {
  res.locals.layout = 'creator/components/layout';
  res.render('creator/package/create', { title_nav: 'Package Create | Octagram' })
}