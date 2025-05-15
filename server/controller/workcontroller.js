const mongoose = require("mongoose");
const WorkTime = require("../model/WrokTime");

const fetchWorkTime = async (req, res) => {
  let workTimeData;
  try {
    workTimeData = await WorkTime.find({ uid: req.user.uid });
  } catch (e) {
    console.log(e);
  }

  if (!workTimeData) {
    return res.status(404).json({ message: "no data found" });
  }
  return res.status(200).json(workTimeData);
};

const addWorktime = async (req, res) => {
  const { startTime, endTime, hoursWorked, date } = req.body;
  try {
    const newWork = new WorkTime({
      uid: req.user.uid,
      startTime,
      endTime,
      hoursWorked,
      date,
    });
    await newWork.save();
    return res.status(200).json({ newWork });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Error saving entry", e });
  }
};

module.exports = {fetchWorkTime, addWorktime };
