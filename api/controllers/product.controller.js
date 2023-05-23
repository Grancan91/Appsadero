const Product = require("../models/product.model")

const createProduct = async (req, res) => {
    try {
    const product = await Product.create({
        name: req.body.name,
        und: req.body.und,
        price: req.body.und
    })      
    console.log("Product created")
    return res.status(200).json(product)
    } catch (err) {
    return res.status(404).send("Error: " + err)
    }
}




module.exports = {
    createProduct
}