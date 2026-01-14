export function buildMonthlyChartData(monthlyData) {
  // monthlyData = { "07/2025": {...}, "08/2025": {...}, ... }
  const months = Object.keys(monthlyData);

  const services = new Set();
  months.forEach((m) => {
    Object.keys(monthlyData[m].groupData).forEach((s) => services.add(s));
  });

  const dataset = Array.from(services).map((service) => {
    return {
      seriesname: service,
      data: months.map((m) => ({
        value: monthlyData[m].groupData[service] ?? 0,
      })),
    };
  });

  return {
    categories: [
      {
        category: months.map((m) => ({ label: m })),
      },
    ],
    dataset,
  };
}

export function buildDailyChartData(dailyData) {
  const dates = Object.keys(dailyData).sort();

  const services = new Set();
  dates.forEach((d) =>
    Object.keys(dailyData[d].groupData).forEach((s) => services.add(s))
  );

  const dataset = Array.from(services).map((service) => {
    return {
      seriesname: service,
      data: dates.map((d) => ({
        value: dailyData[d].groupData[service] ?? 0,
      })),
    };
  });

  return {
    categories: [
      {
        category: dates.map((d) => ({ label: d })),
      },
    ],
    dataset,
  };
}

export function consolidateGroupWiseData(rawGroupWiseData) {
  const grouped = {};

  rawGroupWiseData.forEach((entry) => {
    const { groupName, periodCostData, totalCost } = entry;

    if (!grouped[groupName]) {
      grouped[groupName] = {
        groupName,
        periodCostData: { ...periodCostData },
        totalCost: totalCost || 0,
      };
    } else {
      // Merge periods
      Object.entries(periodCostData).forEach(([period, cost]) => {
        grouped[groupName].periodCostData[period] =
          (grouped[groupName].periodCostData[period] || 0) + cost;
      });

      // Sum totals
      grouped[groupName].totalCost += totalCost || 0;
    }
  });

  // Convert to array
  return Object.values(grouped);
}
