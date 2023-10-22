const Member = require('../../../models/Member')

module.exports = async (req, res) => {
  try {
    const memberlist = await Member.dashboard();
    res.json(memberlist);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
