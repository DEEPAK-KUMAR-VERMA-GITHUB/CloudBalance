import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const SavingsBarChart = ({ data }) => {
  const chartConfigs = {
    type: "column2d",
    width: "100%",
    height: 300,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "",
        xAxisName: "",
        yAxisName: "",
        numberPrefix: "$",
        theme: "fusion",
        showValues: "0",
        plotSpacePercent: "60",
        paletteColors: "#5eead4",
        showBorder: "0",
        bgColor: "#ffffff",
        canvasBgColor: "#ffffff",
        showCanvasBorder: "0",
        showYaxisValues: "1",
        showXAxisLine: "0",
        divLineColor: "#e5e7eb",
        divLineAlpha: "50",
        usePlotGradientColor: "0",
        showPlotBorder: "0",
        captionFontSize: "11",
        baseFontColor: "#6b7280",
      },
      data: data.map((item) => ({
        label: item.date,
        value: item.value,
      })),
    },
  };
  return <ReactFC {...chartConfigs} />;
};

export default SavingsBarChart;
