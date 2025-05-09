import React from "react";
import { Link } from "react-router-dom";
import classes from "./style.module.css";
export default function Home() {
  return (
    <div className={classes.homeContainer}>
     
      <div className={classes.wrapperContainer}>
        <h3>My-Tracker</h3>
        <div>
          <img
            src="https://visme.co/blog/wp-content/uploads/2022/12/15-Best-Practices-to-Help-You-Improve-Your-Time-Management-Skills-Header.jpg"
            alt=""
          />
        </div>
        <div>
          <h1>Be time conscious with TIME-MANAGE</h1>
          <div>
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
