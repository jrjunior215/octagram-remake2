module.exports = async (req, res) => {
    res.locals.layout = '404/components/layout';
    res.render('404/index');
}
  