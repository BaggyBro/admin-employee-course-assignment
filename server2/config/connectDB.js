const Sequelize = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('trial', process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize