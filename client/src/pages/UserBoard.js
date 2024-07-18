import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TeamMembers from "../components/TeamMembers";
import MyTraining from "../components/MyTraining";

const AdminBoard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        console.log("Token not found!");
        return; // Exit the function if no token
      }

      try {
        const response = await axios.get(
          `http://localhost:1234/api/checkauth`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = response;

        if (data.user._id !== userId) {
          console.log("User ID mismatch or not an admin.");
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          console.log("User authorized.");
        }
      } catch (error) {
        console.log("Error in token authentication!", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-altresblue flex items-center p-4">
        <img src="/ALTRES.png" alt="ALTRES" className="h-10" />
        <button
          onClick={handleLogout}
          className="ml-auto text-white font-bold bg-red-400 py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-8 w-30 mt-5 border-black">
        <div>
          <MyTraining />
        </div>
      </div>
    </div>
  );
};

export default AdminBoard;
