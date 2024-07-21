const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: false
    },
    link: {
        type: String,
        required: true
    },
    competency : {
        type: String,
        required: false
    },
    type : {
        type: String,
        required: false
    },
    category : {
        type: String,
        required: false
    },
    status : {
        type: String,
        required: false
    },
    duration : {
        type: String,
        required: false
    },
    dueDate : {
        type: String,
        required: false
    },
    completeDate : {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true,
    },
    assignedBy  : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    assignedByName: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
    }
})

const courseModel = new mongoose.model('Course',courseSchema)

module.exports = courseModel