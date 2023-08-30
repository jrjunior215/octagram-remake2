const passport = require('../../../js/passport');

const googleCallBackController = (req, res) => {
  passport.authenticate('google', { session: false, failureRedirect: '/login' })(req, res, () => {
    res.redirect('/home');
  });
};

module.exports = googleCallBackController;