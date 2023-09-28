module.exports = (req, res) => {
  res.locals.layout = 'home/components/layout';
  res.render('home/subscibe/index', {title_nav: 'การติดตาม | Octagram'} );
}