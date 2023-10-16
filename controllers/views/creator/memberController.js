const User = require('../../../models/User');
const Post = require('../../../models/Post');
const Member = require('../../../models/Member');
const Creator = require('../../../models/Creator');

module.exports = async (req, res) => {
  const id_creator = SESSION_USER.creator_id;
  const member = await Member.show(id_creator);
  const status_active = await Member.status_active(id_creator);
  const status_cancel = await Member.status_cancel(id_creator);

  res.locals.layout = 'creator/components/layout';
  res.render('creator/member/index', { title_nav: 'สมาชิก | Octagram', member: member, status_active: status_active, status_cancel: status_cancel })
}