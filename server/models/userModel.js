const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required : [true, "Provide name"]
    },
    email : {
        type: String,
        required : [true, "Provide email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide password"]
    },
    designation : {
        type: String,
        required: [true, "Privde designation"]
    },
    department: {
        type: String,
        required: [true, "Provide Department"]
    },
    admin : {
        type: Boolean,
        required: true
    }
},{
    timestamps: true
})

const userModel = mongoose.model('User',userSchema)

module.exports = userModel