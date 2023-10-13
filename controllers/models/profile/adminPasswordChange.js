const User = require('../../../models/User')

module.exports = async (req, res) => {
    const data = req.body;

    await User.change_pass(data).then((result) => {
        res.redirect('/dashboard')
    }).catch((error) => {
        res.locals.layout = 'admin/components/layout';
        res.render('admin/setting/account', {
            change_error: error,
            title_nav: 'ตั้งค่า | Octagram'
        });
    })

}