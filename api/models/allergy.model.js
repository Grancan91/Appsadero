const sequelize = require('../../db/index')
const { DataTypes } = require('sequelize')

const Allergy = sequelize.define("allergy", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
})

module.exports = Allergy