const sequelize = require("../../db")
const { DataTypes } = require("sequelize")

const Product_Cart = sequelize.define("products_carts", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        
    }
})

