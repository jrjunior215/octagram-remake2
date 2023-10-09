const Category = require('../../../models/Category');

module.exports = async (req, res) => {
  const category = await Category.list();
  
  res.locals.layout = 'home/components/layout';
  res.render('home/search/index', { title_nav: 'ค้นหา | Octagram', categories: category });
}