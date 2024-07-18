const courseModel = require("../models/courseModel");

const updateStatus = async (req, res) => {
  try {
    const { status, completeDate, courseid } = req.body;

    const actualCompleteDate = completeDate.substring(0,10)

    const payload = {
      status: status,
      completeDate: actualCompleteDate,
    };

    const updated = await courseModel.updateOne(
      { _id: courseid },
      { $set: payload  }
    );

    if (updated.nModified === 0) {
      return res.status(404).json({
        message: "Course not found or status not modified",
        error: true,
      });
    }

    const updatedCourse = await courseModel.findOne({courseid});

    return res.status(200).json({
      message: "Course status updated successfully!",
      data: updatedCourse,
      success: true,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message || err,
      error: true,
    });
  }
};

module.exports = updateStatus
