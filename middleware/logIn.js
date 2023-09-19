module.exports = (req, res, next) => {
  if(!req.session.userData) {
    return res.redirect('/login')
  }
  next()
}