import React from "react";
import useFrom from "../../hooks/useFrom";

export default function TimeEnter() {
  const {values,handleChange,resetForm}=useFrom({startTime:"",endTime:""})
  function handleSubmit(e){
    e.preventDefault()
    console.log(values)
    resetForm()
  }
  return (
    <div className="h-screen flex items-center justify-center flex-col text-center bg-[rgba(5,7,10)] text-white gap-4">
      <h1>Enter Your Work time</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-[hsla(220,20%,25%,0.6)] p-3 rounded-sm">
        <div className="flex flex-col gap-3 p-2">
          <h2>Enter your work starting time</h2>
          <input type="time" placeholder="Enter time" name="startTime" value={values.startTime} onChange={handleChange} className="rounded-sm text-black" />
        </div>
        <div className="flex flex-col gap-3 p-2">
          <h2>Enter your work ending time</h2>
          <input type="time" placeholder="Enter time " name="endTime" value={values.endTime} onChange={handleChange} className="rounded-sm text-black" />
        </div>
        <button type="submit" className="bg-white text-black p-1 rounded-sm w-full">
          submit
        </button>
      </form>
    </div>
  );
}
