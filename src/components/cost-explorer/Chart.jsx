import { Card } from "@mui/joy";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import {
  buildDailyChartData,
  buildMonthlyChartData,
} from "../../utils/transformCostData";

Charts(FusionCharts);

export default function CostChart({ data, filters, chartType }) {
  if (!data) return null;

  const { granularity } = filters;

  let dataSource = {
    chart: {
      theme: "fusion",
      numberPrefix: "$",
      caption: granularity === "MONTHLY" ? "Monthly Cost" : "Daily Cost",
      xAxisName: granularity === "MONTHLY" ? "Months" : "Days",
      yAxisName: "Cost",
    },
    categories: [],
    dataset: [],
  };

  if (granularity === "MONTHLY") {
    dataSource = {
      ...dataSource,
      ...buildMonthlyChartData(data.monthlyData),
    };
  } else {
    dataSource = {
      ...dataSource,
      ...buildDailyChartData(data.dailyData),
    };
  }

  return (
    <Card sx={{ p: 0.5 }} variant="outlined">
      <ReactFusioncharts
        type={chartType}
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    </Card>
  );
}
