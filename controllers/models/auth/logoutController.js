module.exports = (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect('/')
    })
  } catch (error) {
    res.redirect('/error');
  }
}
