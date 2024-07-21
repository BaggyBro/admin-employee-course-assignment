import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiPlusCircle } from "react-icons/fi";
import AssignTrainingModal from "../modals/AssignTrainingModal";
import { LiaCommentDotsSolid } from "react-icons/lia";
import CommentModal from "../modals/CommentModal";

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMemberIds, setExpandedMemberIds] = useState([]);
  const [memberCourses, setMemberCourses] = useState([]);
  const [assignModalVisible, setAssignModalVisible] = useState(false);
  const [commentModal, setCommentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:1234/api/allemployees",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setMembers(response.data.allEmployees);
      } catch (err) {
        console.log("Failed to fetch Employees", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1234/api/usercoursedetails"
        );
        setMemberCourses(response.data.userCourseDetails);
      } catch (err) {
        console.log("Failed to fetch Courses", err);
      }
    };

    fetchMembers();
    fetchCourses();
  }, []);

  const toggleRow = (id) => {
    setExpandedMemberIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((expandedId) => expandedId !== id)
        : [...prevIds, id]
    );
  };

  const toggleAssignModal = () => {
    setAssignModalVisible(!assignModalVisible);
  };

  const toggleCommentModal = (course) => {
    setCommentModal(!commentModal);
    setSelectedCourse(course);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Team Members</h2>

        <div className="mb-4">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            style={{ width: "300px" }}
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <table className="table-auto w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="border-b border-gray-300 px-4 py-2 text-left"></th>
              <th className="border-b border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left">
                Training Progress
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left">
                Designation
              </th>
              <th className="border-b border-gray-300 px-4 py-2 text-left">
                Department
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member) => (
              <React.Fragment key={member._id}>
                <tr className="hover:bg-gray-100">
                  <td className="border-b border-gray-300 px-4 py-2">
                    <button
                      className="text-3xl"
                      onClick={() => toggleRow(member._id)}
                    >
                      {expandedMemberIds.includes(member._id) ? "-" : "+"}
                    </button>
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {member.name}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {member.trainingProgress || "N/A"}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {member.designation || "N/A"}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-2">
                    {member.department || "N/A"}
                  </td>
                </tr>
                {expandedMemberIds.includes(member._id) && (
                  <tr>
                    <td colSpan="5" className="p-4">
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
                          {memberCourses
                            .filter((course) => course.user === member._id)
                            .map((course) => (
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
                                <td className="border-b border-gray-300 px-4 py-2 text-left text-xs">
                                  {course.status || "Not started"}
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
                                  <LiaCommentDotsSolid
                                    size={30}
                                    onClick={() => toggleCommentModal(course)}
                                    className="cursor-pointer"
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button
            className="bg-altresblue text-white font-bold p-2 rounded-md flex gap-2 items-center"
            onClick={toggleAssignModal}
          >
            <FiPlusCircle size={25} />
            Assign Training
          </button>
        </div>
      </div>

      {assignModalVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleAssignModal}
          ></div>
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-50">
            <AssignTrainingModal closeModal={toggleAssignModal} />
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl"
              onClick={toggleAssignModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {commentModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleCommentModal}
          ></div>
          <div className="relative bg-white rounded-lg p-8 shadow-lg z-50">
            <CommentModal closeModal={toggleCommentModal} course={selectedCourse} />
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-2xl"
              onClick={toggleCommentModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamMembers;
