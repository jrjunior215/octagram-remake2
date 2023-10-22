const Income = require('../../../models/Income')

module.exports = async (req, res) => {
  try {
    const income = await Income.admin_creator();
    res.json(income);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
