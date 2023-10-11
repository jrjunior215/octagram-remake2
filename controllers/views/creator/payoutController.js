const Credit = require('../../../models/Credit');

module.exports = async (req, res) => {

  const id_creator = SESSION_USER.creator_id;
  const credit = await Credit.select(id_creator);

  res.locals.layout = 'creator/components/layout';
  res.render('creator/payout/index', { title_nav: 'การจ่ายเงิน | Octagram', credits: credit })
}