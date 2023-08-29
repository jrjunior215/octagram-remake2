module.exports = (req, res) => {

  const data = [];

  for (let i = 1; i <= 20; i++) {
    const user = {
      img: `/img/bg.jpg`,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      currentTier: `Tier ${i % 3}`,
      status: i % 2 === 0 ? 'Active' : 'Inactive',
      joinDate: new Date(2023, 0, i).toISOString().split('T')[0],
      lastChargeDate: new Date(2023, 0, i + 5).toISOString().split('T')[0],
      nextChargeDate: new Date(2023, 0, i + 15).toISOString().split('T')[0]
    };

    data.push(user);
  }

  res.locals.layout = 'creator/components/layout';
  res.render('creator/member/index', { title_nav: 'Home | Octagram', data: data })
}