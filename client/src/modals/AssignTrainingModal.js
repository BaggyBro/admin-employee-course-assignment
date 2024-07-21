import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const AssignTrainingModal = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    competency: "",
    duration: "",
    link: "",
    type: "",
    category: "",
    userName: "",
    dueDate: null,
    comments: ""
  });

  const [members, setMembers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      userName: selectedOption ? selectedOption.label : "",
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dueDate: date ? date.toISOString() : null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authorization token is missing');
      return;
    }

    try {
      await axios.post('http://localhost:1234/api/assigncourse', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error("Failed to send data", err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:1234/api/allemployees");
        setMembers(response.data.allEmployees);
      } catch (err) {
        console.log("Failed to fetch data", err);
      }
    };

    fetchMembers();
  }, []);

  const memOptions = members.map((member) => ({
    value: member._id,
    label: member.name,
  }));

  const selectedUser = memOptions.find(option => option.label === formData.userName);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Assign Training</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <label className="font-bold">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            className="bg-gray-200 p-2 rounded flex-grow"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-bold">Description:</label>
          <input
            type="text"
            name="desc"
            value={formData.desc}
            className="bg-gray-200 p-2 rounded flex-grow"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="font-bold">Link:</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            className="bg-gray-200 p-2 rounded flex-grow"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="flex">
            <h3 className="font-bold">Type:</h3>
            <select
              name="type"
              className="bg-gray-200 p-2 rounded flex-grow w-50"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Self Nominated">Self Nominated</option>
              <option value="Manager Assigned">Manager Assigned</option>
              <option value="Mandatory/Compliance">Mandatory/Compliance</option>
            </select>
          </label>
        </div>

        <div>
          <label className="flex">
            <h3 className="font-bold">Category:</h3>
            <select
              name="category"
              className="bg-gray-200 p-2 rounded flex-grow w-50"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Internal-Instructor Led">Internal-Instructor Led</option>
              <option value="External-Instructor Led">External-Instructor Led</option>
              <option value="Internal Certificate">Internal Certificate</option>
              <option value="External Certificate">External Certificate</option>
              <option value="Online Conference/Webinar">Online Conference/Webinar</option>
              <option value="Offline Conference">Offline Conference</option>
              <option value="Online Course">Online Course</option>
            </select>
          </label>
        </div>

        <div>
          <label className="flex">
            <h3 className="font-bold">Competency:</h3>
            <select
              name="competency"
              className="bg-gray-200 p-2 rounded flex-grow w-50"
              value={formData.competency}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select Competency
              </option>
              <option value="Technical">Technical</option>
              <option value="Domain-Based">Domain-Based</option>
              <option value="Leadership">Leadership</option>
              <option value="Analytical">Analytical</option>
              <option value="Interpersonal">Interpersonal</option>
              <option value="Personality Attributes">Personality Attributes</option>
            </select>
          </label>
        </div>

        <div className="flex">
          <h3 className="font-bold">Assign to:</h3>
          <Select
            name="userName"
            options={memOptions}
            value={selectedUser}
            onChange={handleSelectChange}
            className="w-100 px-2 mt-0"
          />
        </div>

        <div className="flex">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <h3 className="font-bold">Completion Due Date:</h3>
              <DatePicker
                name="dueDate"
                value={formData.dueDate ? dayjs(formData.dueDate) : null}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-bold">Duration:</label>
          <input
            type="text"
            name="duration"
            value={formData.duration}
            className="bg-gray-200 p-2 rounded flex-grow"
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label className="font-bold">Comments:</label>
          <input
            type="text"
            name="comments"
            value={formData.comments}
            className="bg-gray-200 p-2 rounded flex-grow"
            onChange={handleChange}
          />
        </div>

        <button className="bg-altresblue text-white font-bold text-2xl rounded-2xl" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AssignTrainingModal;
