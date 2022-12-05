import { Data } from "../../api/types";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import ReactHighCharts from "highcharts-react-official";
import bellcurve from "highcharts/modules/histogram-bellcurve";
import AnomalyDetection from "../../api/AnomalyDetection";
import Statistics from "../../api/Statistics";
import { Stack } from "@chakra-ui/react";
import DarkUnica from "highcharts/themes/high-contrast-dark";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  bellcurve(Highcharts);
  DarkUnica(Highcharts);
}

interface Props {
  data: Data;
  testing_data: Data;
}

const Plot: React.FC<Props> = ({ data, testing_data }: Props) => {
  const newPoints = testing_data.map((datapoint) => [datapoint, 0]);
  const d = data.map((datapoint) => [datapoint, 0]);
  const params = new AnomalyDetection().estimateGaussianParameters(data);
  const normal: Array<Array<number>> = [];
  const stats = new Statistics();
  for (let i = Math.min(...data) - 100; i < Math.max(...data) + 100; i++) {
    normal.push([i, stats.gaussianPDF(i, params)]);
  }
  const config = {
    title: {
      text: "Keystroke Length Distribution",
    },

    xAxis: [
      {
        title: {
          text: "Keystroke Length Distance (in ms)",
        },
        alignTicks: false,
      },
    ],

    yAxis: [
      {
        title: { text: "Probability Density" },
      },
    ],

    series: [
      {
        name: "Gaussian Distribution",
        type: "bellcurve",
        zIndex: -2,
        data: normal,
        color: "#CA8F34",
      },
      {
        name: "True data",
        type: "scatter",
        data: d,
        accessibility: {
          exposeAsGroupOnly: true,
        },
        zIndex: -1,
        marker: {
          radius: 6,
        },
        color: "#FFF",
      },
      {
        name: "Test Data",
        type: "scatter",
        data: newPoints,
        accessibility: {
          exposeAsGroupOnly: true,
        },
        color: "#FF0000",
        marker: {
          symbol: "diamond",
          radius: 4,
          fillColor: "#FF0000",
        },
      },
    ],
  };

  return (
    <Stack width={700} minHeight={"400px"} margin={"20px 0"}>
      <ReactHighCharts
        highcharts={Highcharts}
        config={config}
        options={config}
      ></ReactHighCharts>
    </Stack>
  );
};

export default Plot;
