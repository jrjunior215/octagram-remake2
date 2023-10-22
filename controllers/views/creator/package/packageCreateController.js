module.exports = (req, res) => {
  try {
    res.locals.layout = 'creator/components/layout';
    res.render('creator/package/create', { title_nav: 'Package Create | Octagram' })
  } catch (error) {
    res.redirect('/error');
  }
}
