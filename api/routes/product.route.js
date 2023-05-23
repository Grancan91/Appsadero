const router = require("express").Router()
const { createProduct } = require("../controllers/product.controller")

router.use("/", createProduct)

module.exports = router