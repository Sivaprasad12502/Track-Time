import React, { useState } from "react";
import { BarLoader } from "react-spinners";

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
    return (
      <div>
        <BarLoader color="black" size={100} />
      </div>
    );
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
  const monthlyTotalHours = data
    ?.filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getMonth() === currentMont &&
        entryDate.getFullYear() === currentYear
      );
    })
    .reduce((sum, e) => sum + e.hoursWorked, 0);
  if (!data || data.length == 0) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <h2 className="text-2xl font-bold text-[gray]">No Work Data added</h2>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 md:grid grid-cols-2">
      <div className="text-center flex flex-col drop-shadow-shadowBox   gap-1 p-4  text-[black] bg-[#fff] rounded-[20px] transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full  h-full  border-b-[3px] border-[black] border">
        <h2 className="font-bold text-lg">Today's working status</h2>
        <div className="text-center">
          <span className="bg-neonGreen text-3xl rounded-md text-center">
            {todayTotalHours.toFixed(2)} hrs
          </span>
        </div>
      </div>
      <div className="text-center flex flex-col drop-shadow-shadowBox   gap-1 p-4  text-[black] bg-neonGreen rounded-[20px] transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full  h-full  border-b-[3px] border-[black] border">
        <h2 className="font-bold text-lg bg-white rounded-md">
          yestarday's working status
        </h2>
        <div>
          <span className="bg-white text-3xl rounded-md">
            {yesterdayTotalHours.toFixed(2)} hrs
          </span>
        </div>
      </div>
      <div className="md:col-span-2 md:w-2/3 md:mx-auto text-center flex flex-col drop-shadow-shadowBox   gap-1 p-4  text-[black] bg-gray rounded-[20px] transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full  h-full  border-b-[3px] border-[black] border">
        <h2 className="font-bold text-lg bg-black text-white rounded-md">
          Monthly status
        </h2>
        <div>
          <span className="bg-black text-3xl rounded-md text-white">
            {monthlyTotalHours.toFixed(2)}hrs
          </span>
        </div>
      </div>
    </div>
  );
}
