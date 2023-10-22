const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {

  try {

    const creator = await Creator.all_index();

    res.locals.layout = 'index/components/layout';
    res.render('index/creator/index', { creator: creator });
    
  } catch (error) {
    res.redirect('/error');
  }
}