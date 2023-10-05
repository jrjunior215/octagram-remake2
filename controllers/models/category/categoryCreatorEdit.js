const Category = require('../../../models/Category')

module.exports = async (req, res) => {
  const data = await req.body;
  const { id_creator, id_category} = data;
  if (!id_category) {
    await Category.reset(id_creator);
    res.redirect('/creator/about');
  } else {
      await Category.reset(id_creator);
      const idCategories = id_category.map(Number);
      const categoryPromises = idCategories.map(async (categoryId) => {
          await Category.add(categoryId, id_creator);
      });
      await Promise.all(categoryPromises);
      res.redirect('/creator/about');
  }
}