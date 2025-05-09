import React from 'react'
import classes from './style.module.css'

export default function TimeComponent() {
  return (
    <div className={classes.timeWrapper}>
       <div className={classes.timeContainer}>
        <h2>Today's working status</h2>
        <div>
            <span>4 hrs</span>
        </div>
       </div>
       <div className={classes.timeContainer}>
        <h2>yestarday's working status</h2>
        <div>
            <span>4 hrs</span>
        </div>
       </div>
       <div className={classes.timeContainer}>
        <h2>Monthly status</h2>
        <div>
            <span>4 hrs</span>
        </div>
       </div>

       <div className={classes.timeContainer}>
        <div><h2>average working hours</h2><span>4hr</span></div>
        <div><h2>Total working hours</h2><span>4hr</span></div>
        
       </div>
    </div>
  )
}
