module.exports = (req, res) => {
  const role = SESSION_USER.role;

  if (role === "USER") {
    res.locals.layout = 'creator/components/layout';
    res.render('creator/new_creator/index', { title_nav: 'Home | Octagram'})
  } else if (role === "CREATOR") {
    res.locals.layout = 'creator/components/layout';
    res.render('creator/index/index', { title_nav: 'Home | Octagram' })
  }

}