import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusModal from "../modals/StatusModal";
import { LiaCommentDotsSolid } from "react-icons/lia";

const MyTraining = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:1234/api/usercoursedetailsbytoken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCourses(response.data.userCourses);
    };

    fetchCourses();
  }, []);

  const toggleStatusModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  console.log(courses);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Training</h2>
        <table className="table-auto w-full border-collapse border border-gray-200 bg-gray-50 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Training Title
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Competency
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Type
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Category
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Status
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Duration
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Due Date
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Completed Date
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.title || "N/A"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.competency || "N/A"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.type || "N/A"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.category || "N/A"}
                </td>
                <td
                  className="border-b border-gray-300 px-4 py-2 text-left text-xs text-decoration-line: underline cursor-pointer"
                  onClick={() => toggleStatusModal(course)}
                >
                  {course.status}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.duration || "N/A"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.dueDate || "N/A"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  {course.completeDate || "---"}
                </td>
                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                  <LiaCommentDotsSolid size={30}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedCourse && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50" onClick={closeModal}></div>
            <div className="relative bg-white rounded-lg p-8 shadow-lg z-50">
              <StatusModal course={selectedCourse} closeModal={closeModal} />
              <button
                className="absolute top-0 right-0 mt-4 mr-4 text-2xl"
                onClick={closeModal}
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyTraining;
