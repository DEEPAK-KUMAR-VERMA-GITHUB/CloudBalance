export const buildFusionBarData = (monthWise) => {
  const months = Object.keys(monthWise);
  const services = new Set();
  months.forEach((month) =>
    Object.keys(monthWise[month].groupData).forEach((service) =>
      services.add(service)
    )
  );

  return {
    categories: [
      {
        category: months.map((m) => ({ label: m })),
      },
    ],
    dataset: [...services].map((service) => ({
      seriesname: service,
      data: months.map((m) => ({
        value: monthWise[m].groupData[service] || 0,
      })),
    })),
  };
};

export const buildCostTable = (groupWise) => {
  const monthsSet = new Set();

  groupWise.forEach((g) =>
    Object.keys(g.monthlyData).forEach((m) => monthsSet.add(m))
  );

  const months = [...monthsSet].sort(
    (a, b) =>
      new Date(a.split("/").reverse().join("-")) -
      new Date(b.split("/").reverse().join("-"))
  );

  return { months, rows: groupWise };
};
