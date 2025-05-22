import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJs,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  plugins,
  scales,
} from "chart.js";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BarLoader } from "react-spinners";
import BackButton from "../BackSwitch";
ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
const API_URL = process.env.REACT_APP_API_URL;
const VerticalBarChart = () => {
  //Data for the chart
  const [chartData, setChartData] = useState({
    labels: ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"], // x-axis labels
    datasets: [
      {
        label: "workingHours",
        data: [0, 0, 0, 0, 0, 0, 0], // y-axis data points
        backgroundColor: "#c1ff72", //bar color
        borderRadius: 5, //Rounded corners for bars
      },
    ],
  });
  const fetchWorkEntries = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) throw new Error("User not logged");
    const token = await user.getIdToken();
    const res = await axios.get(`${API_URL}/workTime`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  };
  const { data, isLoading } = useQuery({
    queryKey: ["workEntries"],
    queryFn: fetchWorkEntries,
  });

  useEffect(() => {
    if (!data) return;

    const weekData = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thur: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };
    data.forEach((entry) => {
      const dateObj = new Date(entry.date);
      const dayIndex = dateObj.getDay();
      const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const dayLabel = dayMap[dayIndex];
      if (weekData[dayLabel] !== undefined) {
        weekData[dayLabel] += entry.hoursWorked;
      }
    });
    const updatedData = [
      weekData["Mon"],
      weekData["Tue"],
      weekData["Wed"],
      weekData["Thur"],
      weekData["Fri"],
      weekData["Sat"],
      weekData["Sun"],
    ];
    setChartData((prev)=>({
      ...prev,
      datasets:[
        {
          ...prev.datasets[0],
          data:updatedData
        }
      ]
    }))
  },[data]);
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
          color: "black", // light white grid
          lineWidth: 2,
        },
        ticks: {
          color: "black", // y-axis label color
        },
      },
      x: {
        grid: {
          color: "black", // light white grid on x-axis
          lineWidth:2
        },
        ticks: {
          color: "black", // x-axis label color
        },
      },
    },
  };
  if(isLoading)return  <div className="flex h-screen items-center justify-center"><BarLoader/></div>;
  return (
    <div className="p-2 h-screen flex flex-col justify-center bg-white md:max-w-[768px] mx-auto">
      <BackButton/>
      <h2 className="w-fit p-1 bg-black text-neonGreen text-3xl font-bold">Daily working data</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default VerticalBarChart;
