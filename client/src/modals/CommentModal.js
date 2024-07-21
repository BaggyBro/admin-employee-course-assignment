import React from 'react'

const CommentModal = ({closeModal, course}) => {
    const courseComments = course.comments;

  return (
    <div>
        <div>
            {courseComments}
        </div>
    </div>
  )
}

export default CommentModal