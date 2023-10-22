const User = require('../../../models/User');

module.exports = async (req, res) => {
    try {
        const data = req.body;

        await User.change_pass(data).then((result) => {
            res.redirect('/home')
        }).catch((error) => {
            res.locals.layout = 'home/components/layout';
            res.render('home/setting/account', {
                change_error: error,
                title_nav: 'ตั้งค่า | Octagram'
            });
        })
    } catch (error) {
        res.redirect('/error');
    }
}
