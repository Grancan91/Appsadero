const sequelize = require("../../db")
const { DataTypes } = require("sequelize")

const Product_Cart = sequelize.define("product_cart", {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    buyed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
})

module.exports = Product_Cart;