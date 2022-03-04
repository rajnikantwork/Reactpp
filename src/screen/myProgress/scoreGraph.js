import React from "react";
import { Line } from "react-chartjs-2";
// import Chart from "chart.js";
// interface Props {
//   labels: Array<string>;
//   averageData: Array<number>;
//   applicationData: Array<number>;
//   ruleData: Array<number>;
//   structureData: Array<number>;
//   scoreChartLegend: any;
// }
function LineChart({
  labels,
  averageData,
  applicationData,
  ruleData,
  structureData,
  scoreChartLegend,
}) {
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Average",
        data: averageData,
        borderColor: "#2aaebc",
        tension: 0.5,
        borderWidth: 3,
      },
      {
        label: "Application",
        data: applicationData,
        borderColor: "#c19ee3",
        tension: 0.5,
        borderWidth: 3,
      },
      {
        label: "Rule",
        data: ruleData,
        borderColor: "#f2ce7e",
        tension: 0.5,
        borderWidth: 3,
      },
      {
        label: "Structure",
        data: structureData,
        borderColor: "#fd8b84",
        tension: 0.5,
        borderWidth: 3,
      },
    ],
  };
  console.log(data);
  const options = {
    datasets: {},
    responsive: true,
    // maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "Percentage (%)",
        },
        display: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  const [chartData, setChartData] = React.useState(data);
  React.useEffect(() => {
    if (scoreChartLegend.average) {
      setChartData({ labels: labels, datasets: [data.datasets[0]] });
    } else if (scoreChartLegend.rule) {
      setChartData({ labels: labels, datasets: [data.datasets[2]] });
    } else if (scoreChartLegend.application) {
      setChartData({ labels: labels, datasets: [data.datasets[1]] });
    } else if (scoreChartLegend.structure) {
      setChartData({ labels: labels, datasets: [data.datasets[3]] });
    } else setChartData(data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreChartLegend]);

  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart;
