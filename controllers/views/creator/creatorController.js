module.exports = (req, res) => {
    res.locals.layout = 'creator/components/layout';
    res.render('creator/index', {title_nav: 'Home | Octagram'})
  }