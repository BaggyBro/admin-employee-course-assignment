import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [errorMessage, setErrorMessage] = useState("");  // Add state for error message

  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");  // Clear previous error message
    try {
      const response = await axios.post(
        "http://localhost:1234/api/login",
        formData
      );

      const { data } = response;
      localStorage.setItem('token', data.token);

      if (data.data.admin) {
        navigate(`/adminboard/${data.data._id}`);
      } else {
        navigate(`/userboard/${data.data._id}`);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-950">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p> 
          )}
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Login
          </button>
          <p>Don't have an account? <Link to={"/register"} className="text-blue-300">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
