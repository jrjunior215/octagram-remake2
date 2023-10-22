const Member = require('../../../models/Member')

module.exports = async (req, res) => {
  try {
    const id_user = SESSION_USER.id;
    const membership = await Member.navbar(id_user);
    res.json(membership);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
