const passport = require('../../../js/passport');

module.exports = async (req, res) => {
  try {
    await passport.authenticate('google', { scope: ['profile', 'email'], prompt: 'select_account' })(req, res);
  } catch (error) {
    res.redirect('/error');
  }
}
