import React from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
export default function Home() {
  return (
    <div className={classes.homeContainer}>
     
      <div className={classes.wrapperContainer }>
        <h3>My-Tracker</h3>
        <div>
          <img
            src={require('../../assets/Group.png')}
            alt="Time imgage"
          />
        </div>
        <div className={classes.wrapperContainerContainer}>
          <h1>Be time conscious with TIME-MANAGE</h1>
          <div className="bg-[#e5e5e5]">
            Always get your self prepared with our exclusive{" "}
            <strong>TIME-MANAGE APP</strong>. This will reduce your daily stress
            and improve your scheduled activities with advance improvements.
          </div>
        </div>
        <div>
          <Link to={"/register"}>
            <button>Start Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
