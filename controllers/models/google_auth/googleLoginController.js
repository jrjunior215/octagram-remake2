const User = require('../../../models/User');

module.exports = async (req, res) => {
  try {
    const role = SESSION_USER.role;
    const id_user = SESSION_USER.id;

    if (role === "USER") {
      res.redirect('/home')
    } else if (role === "CREATOR") {
      const Creator = await User.creator_login(id_user).then(async (result) => {
        req.session.userData = await result[0]
      })
      res.redirect('/creator')
    } else if (role === "ADMIN") {
      res.redirect('/dashboard')
    }
  } catch (error) {
    res.redirect('/error');
  }
}
