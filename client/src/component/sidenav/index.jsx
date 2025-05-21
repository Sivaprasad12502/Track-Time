import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import classes from "./style.module.css";
import { FaInfoCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../Firebase/firebase";

export default function Sidenav() {
  const [nav, setNav] = useState(false);
  function sideView() {
    setNav((prev) => !prev);
  }
  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/register";
      console.log("User logged out Successfully");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }
  return (
    <div className={classes.Container}>
      <div>
        <button onClick={sideView}>
          <HiMenu />
        </button>
        <div>
          <ul className={nav ? classes.active : ""}>
            <li className="flex items-center gap-2">
              <FaInfoCircle />
              About
            </li>

            <li className="flex items-center gap-2">
              <button onClick={handleLogout} className="flex items-center hover:text-[red]">
                <FiLogOut />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
