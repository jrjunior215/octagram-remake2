module.exports = (req, res) => {
  res.locals.layout = 'index/components/layout';
  res.render('index/index')
}