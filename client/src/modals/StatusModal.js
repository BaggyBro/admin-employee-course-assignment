import axios from "axios";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const StatusModal = ({ course, closeModal }) => {
  const [status, setStatus] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const courseid = course._id

  const body = {status, completeDate, courseid}

  console.log(courseid)

  const handleSubmit = async(e) =>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:1234/api/updateuserstatus',body);
      console.log("Data Updates sucessfully!")
      closeModal();
      window.location.reload()
    }catch(err){
      console.log(err.message);
    }
  }

  useEffect(() => {

  },[])

  const handlestatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleDateChange = (date) =>{
    setCompleteDate(date.toISOString())
  }

  console.log(status);
  console.log(completeDate)

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Change Status</h3>
      <div className="flex flex-col gap-4">
        <div className="flex">
          <h3 className="font-bold">Name: </h3>
          <span className="ml-2"> {course.userName}</span>
        </div>

        <div className="flex">
          <h3 className="font-bold">Course Name: </h3>
          <span className="ml-2"> {course.title}</span>
        </div>

        <div className="flex">
          <h3 className="font-bold">Description: </h3>
          <span className="ml-2"> {course.description}</span>
        </div>

        <div className="flex">
          <h3 className="font-bold">Change status to: </h3>
          <select
            className="bg-gray-200 p-2 rounded flex-grow w-50 ml-2"
            onChange={handlestatusChange}
          >
            <option value="" disabled>
              Not Started
            </option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        {status === "Completed" && (
          <div className="flex">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <h3 className="font-bold">Completion Due Date: </h3>
                <DatePicker
                  name="dueDate"
                  value={completeDate ? dayjs(completeDate) : null} // Convert ISO string back to Dayjs object
                  onChange={handleDateChange}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        )}

        <button className="bg-altresblue text-white font-bold rounded-2xl" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default StatusModal;
