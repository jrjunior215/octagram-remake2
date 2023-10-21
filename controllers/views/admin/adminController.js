const User = require('../../../models/User');
const Creator = require('../../../models/Creator');
const Member = require('../../../models/Member');

module.exports = async (req, res) => {

  const user = await User.all();
  const creator = await Creator.all();
  const creator_reg = await Creator.all_reg();
  const member = await Member.all();
  const all_active = await Member.all_active();
  const all_cancel = await Member.all_cancel();
  const all_pendding = await Member.all_pendding();
  const member_dashboard = await Member.dashboard();
  
  res.locals.layout = 'admin/components/layout';
  res.render('admin/index/index', { title_nav: 'Dashboard | Octagram', users: user, creators: creator, creator_regs: creator_reg, members: member, all_active: all_active, all_cancel: all_cancel, all_pendding: all_pendding, member_dashboard: member_dashboard })
}