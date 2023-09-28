module.exports = (req, res) => {
  res.locals.layout = 'creator/components/layout';
  res.render('creator/payout/index', { title_nav: 'การจ่ายเงิน | Octagram' })
}