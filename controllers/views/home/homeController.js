module.exports = (req, res) => {
    res.locals.layout = 'home/components/layout';
    res.render('home/index', {title_nav: 'Home | Octagram'})
}