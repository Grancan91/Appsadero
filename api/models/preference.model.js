const sequelize = require('../../db/index')
const { DataTypes } = require('sequelize')

const Preference = sequelize.define('preference', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{updatedAt: false,
    createdAt: false}
)

module.exports = Preference;