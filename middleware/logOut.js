module.exports = (req, res, next) => {
  if(req.session.userData) {
    if( SESSION_USER.role === "USER" ) {
      return res.redirect('/home')
    } else if ( SESSION_USER.role === "ADMIN" ) {
      return res.redirect('/creator')
    } else {
      return res.redirect('/')
    }
  }
  next()
}