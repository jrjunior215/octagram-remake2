const passport = require('../../../js/passport');
const User = require('../../../models/User');

const googleCallBackController = (req, res, next) => {
  passport.authenticate('google', { session: false, failureRedirect: '/login' }, async (err, user, info) => {
    if (err) {
      return next(err); // Handle errors appropriately
    }

    if (!user) {
      return res.redirect('/login'); // Handle failed authentication
    }

    const { id, role } = user;
    let redirectPath = '/';

    if (role === "USER") {
      redirectPath = '/home';
    } else if (role === "ADMIN") {
      redirectPath = '/';
    } else if (role === "CREATOR") {
      const Creator = await User.creator_login(id);
      req.session.userData = Creator[0];
      redirectPath = '/creator';
    }

    req.session.userData = user;
    res.redirect(redirectPath);
  })(req, res, next);
};

module.exports = googleCallBackController;