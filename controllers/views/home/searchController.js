module.exports = (req, res) => {
    res.locals.layout = 'home/components/layout';
    res.render('home/search/index', {title_nav: 'ค้นหา | Octagram'});
  }