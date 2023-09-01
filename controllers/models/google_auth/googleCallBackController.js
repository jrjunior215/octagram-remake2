const passport = require('../../../js/passport');
const User = require('../../../models/User');

const googleCallBackController = async (req, res) => {
  passport.authenticate('google', { session: false })(req, res, async () => {
    const data = req.user;
    const { id, role } = data;

    if (role === "USER") {
      req.session.userData = data;
      res.redirect('/home');
    } else if (role === "ADMIN") {
      req.session.userData = data;
      res.redirect('/');
    } else if (role === "CREATOR") {
      const id_user = id;
      const Creator = await User.creator_login(id_user);
      req.session.userData = Creator[0];
      res.redirect('/creator');
    } else {
      req.session.userData = data;
      res.redirect('/');
    }
  });
};

module.exports = googleCallBackController;