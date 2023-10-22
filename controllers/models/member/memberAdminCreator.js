const Member = require('../../../models/Member')

module.exports = async (req, res) => {
  try {
    const memberlist = await Member.admin_creator();
    res.json(memberlist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}