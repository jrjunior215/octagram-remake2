const Member = require('../../../models/Member');

module.exports = async (req, res) => {

    const id_user = SESSION_USER.id;

    const member = await Member.navbar(id_user);

    res.locals.layout = 'home/components/layout';
    res.render('home/index/index', {title_nav: 'Home | Octagram', members: member })
}