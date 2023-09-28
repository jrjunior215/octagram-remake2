module.exports = (req, res) => {
    res.locals.layout = 'creator/components/layout';
    res.render('creator/setting/index', { title_nav: 'ตั้งค่า | Octagram' })
}