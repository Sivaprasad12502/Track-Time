import React, { use } from "react";
import useFrom from "../../hooks/useFrom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export default function TimeEnter() {
  const queryClient = useQueryClient();
  const { values, handleChange, resetForm } = useFrom({
    startTime: "",
    endTime: "",
  });
  const { data: workEntries = [] } = useQuery({
    queryKey: ["workEntries"],
    queryFn: async () => {
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
    },
  });
  console.log("WorkEtnries from queryClient:", workEntries);
  const today = new Date().toISOString().split("T")[0];
  const todayEntries =
    workEntries?.filter((entry) => entry.date === today) || [];
  console.log("TodayEntries filtered:", todayEntries);
  function timeToMinute(timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }
  const latestEndTimeMin = todayEntries.length
    ? Math.max(...todayEntries.map((entry) => timeToMinute(entry.endTime)))
    : 0;

  console.log("latestEndTimeMin:", latestEndTimeMin);

  function handleSubmit(e) {
    e.preventDefault();
    const { startTime, endTime } = values;
    // Convert to minutes
    if (!startTime || !endTime) {
      return alert("Please enter both start and end time.");
    }
    if (startTime === endTime) {
      return alert("start and end time cannot be the same");
    }
    const newSTartTimeMin = timeToMinute(startTime);
    if (newSTartTimeMin <= latestEndTimeMin) {
      alert("start time must be after last entry's end time");
      return;
    }
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const start = startH * 60 + startM;
    const end = endH * 60 + endM;
    let workedMinutes = end - start;
    if (workedMinutes <= 0 && end <= start) {
      alert(
        "End time must be after start time, or it should wrap into next day explicitly."
      );
      return;
    }
    if (workedMinutes < 0) workedMinutes += 24 * 60;
    const workdedHours = (workedMinutes / 60).toFixed(2);
    const today = new Date().toISOString().split("T")[0];
    const workdata = {
      startTime,
      endTime,
      hoursWorked: Number(workdedHours),
      date: today,
    };
    console.log("Worded Data:", workdata);
    addWorkEntry.mutate(workdata);
    resetForm();
  }
  const addWorkEntry = useMutation({
    mutationFn: async (workEntry) => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        throw new Error("user is not logged in");
      }
      const token = await user.getIdToken();
      await axios.post(`${API_URL}/workTime/addWork`, workEntry, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workEntries"] });
      console.log("sussessfully added");
    },
    onError: (error) => {
      console.error(error, "error in worktime adding");
    },
  });
  return (
    <div className="flex flex-col gap-2 p-2 ">
      <h1 className="font-bold text-center">Enter Your Work time</h1>
      <form onSubmit={handleSubmit} className="flex flex-col p-2">
        <div className="flex flex-col gap-3 p-2">
          <h2 className="bg-black text-[#c1ff72] p-1 rounded-sm">Enter your work starting time</h2>
          <input
            type="time"
            placeholder="Enter time"
            name="startTime"
            value={values.startTime}
            onChange={handleChange}
            className="bg-white drop-shadow-shadowBox w-full p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-3 p-2">
          <h2 className="bg-black text-[#c1ff72] p-1 rounded-sm">Enter your work ending time</h2>
          <input
            type="time"
            placeholder="Enter time "
            name="endTime"
            value={values.endTime}
            onChange={handleChange}
            className="bg-white drop-shadow-shadowBox w-full p-2 rounded-md"
          />
        </div>
        <div className="flex justify-center w-full">
          <button
            type="submit"
            className="text-[#c1ff72] font-bold border bg-[black]  rounded-md p-1"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
