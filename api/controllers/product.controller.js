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

const getOneProduct = async (req, res) => {
    try{
        const product = await Product.findOne({ where: {id: req.params.productId}})
        return res.status(200).json(product)
    }catch (err){
        console.log(err)
        return res.status(400).send(err)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const product = await Product.findAll()
        return res.status(200).json(product)
    } catch(err) {
        return res.status(400).send(err)
    }
}

const updateProduct = async (req, res) => {
    try {   
        const [productExist, product] = await Product.update(req.body, {
            returning: true,
            where: {
                id: req.params.productId,
            },
        });

        if(productExist !== 0){
            return res.status(200).json(`Updated ${req.body.name}`)
        } else {
            return res.status(400).send("Can't update")
        }
    } catch (err) {
        console.log(err)
        return res.status(400).send(err)
    }
}
    const deleteProduct = async (req, res) => {
        try {
            const product = await Product.destroy({where: {id: req.params.productId}})
            return res.status(200).json(`Product with id: ${req.params.id} has been deleted`)
        } catch (err) {
            return res.status(500).send(err)
        }
    }
    


module.exports = {
    createProduct,
    getOneProduct,
    getAllProducts,
    updateProduct,
    deleteProduct
}