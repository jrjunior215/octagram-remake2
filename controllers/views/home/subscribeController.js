module.exports = (req, res) => {
  try {
    res.locals.layout = 'home/components/layout';
    res.render('home/subscibe/index', {title_nav: 'การติดตาม | Octagram'} );
  } catch (error) {
    res.redirect('/error');
  }
}
