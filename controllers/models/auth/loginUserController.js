const User = require('../../../models/User')

module.exports = async (req, res) => {
  const data = req.body;

  await User.login(data).then(async (result) => {
    if (result[0].role === "USER") {
      req.session.userData = result[0]
      res.redirect('/home');
    } else if (result[0].role === "ADMIN") {
      req.session.userData = result[0]
      res.redirect('/');
    } else if (result[0].role === "CREATOR") {
      const id_user = result[0].id;
      const Creator = await User.creator_login(id_user);
      req.session.userData = Creator[0]
      res.redirect('/creator');
    } else {
      req.session.userData = result[0]
      res.redirect('/');
    }
  }).catch((error) => {
    res.locals.layout = 'auth/components/layout';
    res.render('auth/login', {
      login_error: error,
      old_data: data,
      title_nav: 'Sign in | Octagram'
    });
  })

}