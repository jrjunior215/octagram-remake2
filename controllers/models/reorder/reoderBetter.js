const Package = require('../../../models/Package');
const Member = require('../../../models/Member');

module.exports = async (req, res) => {
  try {
    const id_package = req.query.id_package;
    const id_creator = req.query.id_creator;
    const id_user = SESSION_USER.id;

    const package = await Package.select_withcreator(id_package);
    const member = await Member.check2(id_creator, id_user);
    const creator_name = package[0].creator_name;

    res.locals.layout = 'home/components/layout';
    res.render('home/checkout/better', { title_nav: `Checkout ${creator_name} | Octagram`, packages: package, members: member });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error'); // Adjust the error handling as needed
  }
}