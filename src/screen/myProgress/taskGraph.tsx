import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
highchartsMore(Highcharts);
solidGauge(Highcharts);
interface Props {
  reading: number;
  practice: number;
  selfMarking: number;
  seminars: number;
}
function TaskGraph({ reading, practice, selfMarking, seminars }: Props) {
  const options = {
    chart: {
      type: "solidgauge",
      height: "90%",
    },
    title: {
      text: "",
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: "rgba(0,0,0,0.8)",
      shadow: true,
      style: {
        fontSize: "16px",
      },
      pointFormat:
        '<p style = "color:#fff;font-size:15px">You have {series.name} {point.y}%<p>',
    },
    pane: {
      startAngle: 0,
      endAngle: 360,
      background: [
        {
          outerRadius: "100%",
          innerRadius: "81%",
          backgroundColor: "#7576f533",
          borderWidth: 0,
        },
        {
          outerRadius: "80%",
          innerRadius: "61%",
          backgroundColor: "#2aaebc33",
          borderWidth: 0,
        },
        {
          outerRadius: "60%",
          innerRadius: "41%",
          backgroundColor: "#fd8b8433",
          borderWidth: 0,
        },
        {
          outerRadius: "40%",
          innerRadius: "21%",
          backgroundColor: "#f7b50033",
          borderWidth: 0,
        },
      ],
    },
    yAxis: {
      min: 0,
      max: 100,
      lineWidth: 0,
      tickPositions: [],
    },
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: true,
      },
    },
    series: [
      {
        name: "Read",
        data: [
          {
            color: "#7576f5",
            radius: "100%",
            innerRadius: "81%",
            y: reading,
          },
        ],
      },
      {
        name: "Practice",
        data: [
          {
            color: "#2aaebc",
            radius: "80%",
            innerRadius: "61%",
            y: practice,
          },
        ],
      },
      {
        name: "Self marking",
        data: [
          {
            color: "#fd8b84",
            radius: "60%",
            innerRadius: "41%",
            y: selfMarking,
          },
        ],
      },
      {
        name: "Seminars",
        data: [
          {
            color: "#f7b500",
            radius: "40%",
            innerRadius: "21%",
            y: seminars,
          },
        ],
      },
    ],
  };
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default TaskGraph;
