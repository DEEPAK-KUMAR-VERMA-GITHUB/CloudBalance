import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import { Sheet, Typography } from "@mui/joy";
import { buildFusionBarData } from "../../utils/costExplorerTransform";

Charts(FusionCharts);

const CostBarChart = ({ monthWise }) => {
  if (!monthWise) return null;

  const { categories, dataset } = buildFusionBarData(monthWise);

  return (
    <Sheet variant="outlined" sx={{ p: 2, borderRadius: "md" }}>
      <Typography level="h4" mb={1}>
        Monthly Cost Breakdown
      </Typography>

      <ReactFusioncharts
        type="stackedcolumn2d"
        width="100%"
        height="400"
        dataFormat="JSON"
        dataSource={{
          chart: {
            theme: "fusion",
            numberPrefix: "$",
            showValues: "0",
            plotToolText: "<b>$seriesName</b><br>$label: <b>$dataValue</b>",
          },
          categories,
          dataset,
        }}
      />
    </Sheet>
  );
};

export default CostBarChart;
