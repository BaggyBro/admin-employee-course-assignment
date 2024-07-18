import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    designation: "",
    department: "",
    admin: false,
  });

  const { name, email, password, designation, department, admin } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1234/api/register",
        formData
      );
      setFormData({
        name: "",
        email: "",
        password: "",
        designation: "",
        department: "",
        admin: false,
      });
      navigate("/login");
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-gray-600">
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="flex flex-col text-gray-600">
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="flex flex-col text-gray-600">
            Password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="flex flex-col text-gray-600">
            Designation:
            <input
              type="text"
              name="designation"
              value={designation}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="flex flex-col text-gray-600">
            Department:
            <input
              type="text"
              name="department"
              value={department}
              onChange={handleChange}
              required
              className="mt-1 p-2 border border-gray-300 rounded-md"
            />
          </label>
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              name="admin"
              checked={admin}
              onChange={handleChange}
              className="mr-2"
            />
            Admin
          </label>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Register
          </button>
          <p>Already have an account? <Link to={"/login"} className="text-blue-400">Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
