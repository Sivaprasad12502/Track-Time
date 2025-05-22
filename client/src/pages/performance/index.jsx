import React from "react";
import TimeComponent from "../../component/timer";
import BackButton from "../../component/BackSwitch";

export default function Perfo() {
  return (
    <div className="h-screen">
      <div className="flex flex-col items-center justify-center h-full bg-gray">
        <BackButton />
        <TimeComponent />
      </div>
    </div>
  );
}
