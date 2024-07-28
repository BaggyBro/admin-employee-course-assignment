const { DataTypes } = require("sequelize");
const sequelize = require("../config/connectDB");

const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employee: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    manager: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    resetPassToken : {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPassExp : {
        type: DataTypes.STRING,
        allowNull:true
    }
}, {
    timestamps: true
})

module.exports = User