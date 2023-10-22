const Category = require('../../../models/Category');

module.exports = async (req, res) => {
  try {
    const placeholder = req.query.name;
    const id_category = req.query.id_category;

    const category = await Category.list();
    const cate_creator = await Category.creator_list(id_category);
    
    res.locals.layout = 'home/components/layout';
    res.render('home/search/category', { title_nav: 'ค้นหา | Octagram', categories: category, placeholder: placeholder, cate_creator: cate_creator });
  } catch (error) {
    res.redirect('/error');
  }
}
