const Income = require('../../models/Income');

async function processIncome() {
  const memberships = await Income.select();

  const creatorIncomeMap = new Map();

  let totalDeduction = 0;

  const creators_income = [];

  memberships.forEach((membership) => {
    const { id_creator, package_price } = membership;

    if (creatorIncomeMap.has(id_creator)) {
      creatorIncomeMap.set(id_creator, creatorIncomeMap.get(id_creator) + package_price);
    } else {
      creatorIncomeMap.set(id_creator, package_price);
    }

    const deduction = package_price * 0.05;

    totalDeduction += deduction;
  });

  creatorIncomeMap.forEach((income, id_creator) => {
    const deduction = income * 0.05;
    const afterDeduction = income - deduction;

    creators_income.push({
      id_creator,
      income,
      total_income: afterDeduction,
      fee: deduction
    });
  });

  creatorIncomeMap.forEach((income, id_creator) => {
    const deduction = income * 0.05;
  });

  await Income.create_creator(creators_income);
  await Income.create_octagram(totalDeduction);

}

module.exports = {
  processIncome
};
