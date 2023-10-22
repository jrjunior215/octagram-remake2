const Category = require('../../../models/Category');

module.exports = async (req, res) => {
  try {
    const category = await Category.list();
    
    res.locals.layout = 'index/components/layout';
    res.render('index/category/index', { title_nav: 'ค้นหา | Octagram', categories: category });
  } catch (error) {
    res.redirect('/error');
  }
}
