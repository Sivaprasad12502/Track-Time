import React from "react";
import { Bar } from "react-chartjs-2";

import { Chart as ChartJs,BarElement,CategoryScale,LinearScale,Tooltip,Legend, plugins, scales } from "chart.js";
import { color } from "chart.js/helpers";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VerticalBarChart = () => {
  //Data for the chart
  const data = {
    labels: [
      "Mon",
      "Tue",
      "Wed",
      "Thur",
      "Fri",
      "Sat",
      "Sun",
    ], // x-axis labels
    datasets: [
      {
        label: "workingHours",
        data: [1, 2, 5, 7, 3, 19, 3], // y-axis data points
        backgroundColor: "hsl(210, 100%, 65%)", //bar color
        borderRadius: 5, //Rounded corners for bars
      },
    ],
  };

  //options for the chart

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#ffffff", // light white grid
          lineWidth: 1,
        },
        ticks: {
          color: "#ffffff", // y-axis label color
        },
      },
      x: {
        grid: {
          color: "#ffffff", // light white grid on x-axis
        },
        ticks: {
          color: "#ffffff", // x-axis label color
        },
      },
    }
    
  };
  return (
    <div className="h-screen flex flex-col justify-center bg-[rgba(5,7,10)]">
      <h2>Daily working data</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalBarChart;
