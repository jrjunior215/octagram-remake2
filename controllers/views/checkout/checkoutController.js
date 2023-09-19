const Package = require('../../../models/Package');

module.exports = async (req, res) => {
  const id_package = req.query.id_package;

  const package = await Package.select_withcreator(id_package);
  const creator_name = package[0].creator_name;

  res.locals.layout = 'home/components/layout';
  res.render('home/checkout/index', { title_nav: `Checkout ${creator_name} | Octagram`, packages: package })
}