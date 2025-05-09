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
    <div className={classes.maincontainer}>
      <div className={classes.container}>
        <div>
          <Sidenav />
        </div>
        <div className="flex items-center gap-0.5">
          <span>
            <FaUser />
          </span>
          <span className="text-xs">{userDetails?.name}</span>
        </div>
      </div>
      <div className={classes.innerContainer}>
        <div>
          <div className={classes.childContainer}>
            <FaProjectDiagram />
            <Link to={"/projects"}> projects</Link>
          </div>
          <div className={classes.childContainer}>
            <FaTachometerAlt />
            <Link to={"/timesheet"}>timsheet</Link>
          </div>
          <div className={classes.childContainer}>
            {" "}
            <FaRegCircleCheck />
            <Link to={"/activities"}>activity</Link>
          </div>
          <div className={classes.childContainer}>
            <GiMuscleUp /> <Link to={"/performance"}>performance</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
