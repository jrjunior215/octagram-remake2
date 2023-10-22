const User = require('../../../models/User');
const Creator = require('../../../models/Creator');
const Member = require('../../../models/Member');

module.exports = async (req, res) => {
  try {
    const user = await User.all();
    const creator = await Creator.all();
    const creator_reg = await Creator.all_reg();
    const member = await Member.all();

    res.locals.layout = 'admin/components/layout';
    res.render('admin/member/reg_creator', { title_nav: 'ผู้สมัครคริเอเตอร์ | Octagram', users: user, creators: creator, creator_regs: creator_reg, members: member})
  } catch (error) {
    res.redirect('/error');
  }
}
