const User = require('../../../models/User')

module.exports = async (req, res) => {
  const data = req.body;
  const password = req.body.pass;

  if (password.length < 6) {
    const error = 'Password must be 6 characters long';
    res.locals.layout = 'auth/components/layout';
    res.render('auth/register', {
      register_error: error,
      old_data: data
    });
  } else {
    await User.register(data).then((result) => {
      res.redirect('/login')
    }).catch((error) => {
      res.locals.layout = 'auth/components/layout';
      res.render('auth/register', {
        register_error: error,
        old_data: data,
        title_nav: 'Sign up | Octagram'
      });
    })
  }

}