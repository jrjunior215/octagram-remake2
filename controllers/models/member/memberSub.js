const Member = require('../../../models/Member')

module.exports = async (req, res) => {
  try {
    const id_user = SESSION_USER.id;

    const memberlists = await Member.sub(id_user);
    res.json(memberlists);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
