import React, { useState } from "react";
import classes from "./style.module.css";
import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
export default function TimeComponent() {
  const { data, isLoading } = useQuery({
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
  if (isLoading) {
    return <div className="bg-white">Loading...please wait</div>;
  }
  const today = new Date().toISOString().split("T")[0];
  const todayEntries = data?.filter((entry) => entry.date === today);
  const todayTotalHours =
    todayEntries?.reduce((sum, e) => sum + e.hoursWorked, 0) || 0;
  const yestarday = new Date();
  yestarday.setDate(yestarday.getDate() - 1);
  const yestrdayStr = yestarday.toISOString().split("T")[0];
  const yesterdayTotalHours = data
    ?.filter((entry) => entry.date === yestrdayStr)
    .reduce((sum, e) => sum + e.hoursWorked, 0);
  const now = new Date();
  const currentMont = now.getMonth();
  const currentYear = now.getFullYear();
  const monthlyTotalHours = data?.filter((entry) => {
    const entryDate = new Date(entry.date);
    return (
      entryDate.getMonth() === currentMont &&
      entryDate.getFullYear() === currentYear
    );
  }).reduce((sum,e)=>sum+e.hoursWorked,0)
  return (
    <div className={classes.timeWrapper}>
      <div className={classes.timeContainer}>
        <h2>Today's working status</h2>
        <div>
          <span>{todayTotalHours.toFixed(2)} hrs</span>
        </div>
      </div>
      <div className={classes.timeContainer}>
        <h2>yestarday's working status</h2>
        <div>
          <span>{yesterdayTotalHours.toFixed(2)} hrs</span>
        </div>
      </div>
      <div className={classes.timeContainer}>
        <h2>Monthly status</h2>
        <div>
          <span>{monthlyTotalHours.toFixed(2)}hrs</span>
        </div>
      </div>
    </div>
  );
}
