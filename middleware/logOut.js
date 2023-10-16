module.exports = (req, res, next) => {
  if(SESSION_USER) {
    console.log(SESSION_USER);  
    if( SESSION_USER.role === "USER" ) {
      return res.redirect('/home')
    } else if ( SESSION_USER.role === "ADMIN" ) {
      return res.redirect('/dashboard')
    }else if ( SESSION_USER.role === "CREATOR" ) {
      return res.redirect('/creator')
    } else {
      return res.redirect('/')
    }
  }
  next()
}