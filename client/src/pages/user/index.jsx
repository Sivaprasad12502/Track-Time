import React, { useEffect, useState } from "react";
import Sidenav from "../../component/sidenav";
import {
  FaUser,
  FaProjectDiagram,
  FaTachometerAlt,
  FaRegListAlt,
  FaClipboardCheck,
} from "react-icons/fa";
import classes from "./style.module.css";
import { FaRegCircleCheck } from "react-icons/fa6";
import { GiMuscleUp } from "react-icons/gi";
import { Link } from "react-router-dom";
import { auth, db } from "../../component/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
export default function User() {
  const [userDetails, setUserDetails] = useState(null);
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        console.log("user is not logged in");
        setUserDetails(null);
      }
      console.log(user);
      try {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("User is not Logged in");
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    });
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center bg-white shadow-md px-6 py-3 rounded-b-md border-b-[3px] border-[black]">
        {/* Sidenav or logo area */}
        <div>
          <Sidenav />
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
          <FaUser className="text-[#C1FF72]" />
          <span>{userDetails?.name}</span>
        </div>
      </div>
      <div className="gird place-content-center h-screen w-full p-3 sm:p-6 md:p-[7rem] lg:max-w-[768px] mr-auto ml-auto">
        <div className="grid grid-cols-2 place-items-center gap-3 h-1/4 sm:h-1/2">
          <div className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex justify-center items-center gap-1 p-4  text-[black] bg-[#E5E5E5] rounded-md transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full  h-full  border-b-[3px] border-[black]">
            <div className="flex items-center rounded-sm bg-[#C1FF72]">
              <FaProjectDiagram size={30} className="fill-[black] " />
            <Link to={"/projects"}> Projects</Link>
            </div>
          </div>
          <div className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex justify-center items-center gap-1 p-4  text-[#0b0e14] bg-[#C1FF72] rounded-md transition-transform duration-300 ease-linear  hover:translate-y-[-3px] w-full h-full border-b-[3px] border-[black]">
            <div className="flex items-center bg-white rounded-sm">
              <FaTachometerAlt size={30} className="fill-[black]" />
              <Link to={"/timesheet"}>Timesheet</Link>
            </div>
          </div>
          <div className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex justify-center items-center gap-1 p-4  text-[#0b0e14] bg-[#0b0e14] rounded-md transition-transform duration-300 ease-linear  hover:translate-y-[3px] w-full  h-full  border-b-[3px] border-[black]">
            <div className="flex items-center bg-white rounded-sm">
              <FaRegCircleCheck size={30} className="fill-[black]" />
              <Link to={"/activities"}>Activities</Link>
            </div>
          </div>
          <div className="drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] flex justify-center items-center gap-1 p-4  text-[black] bg-[#E5E5E5] rounded-md transition-transform duration-300 ease-linear  hover:translate-y-[3px] w-full  h-full   border-b-[3px] border-[black]">
            <div className="flex items-center bg-[#C1FF72] rounded-sm">
              <GiMuscleUp size={30} className="fill-[black]" />{" "}
            <Link to={"/performance"}>Performance</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
