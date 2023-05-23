const router = require("express").Router()
const { createProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product.controller")
const { checkAuth } = require("../middleware/auth")

router.post("/", checkAuth, createProduct)
router.get("/:productId", checkAuth, getOneProduct)
router.get("/", checkAuth, getAllProducts)
router.put("/:productId", checkAuth, updateProduct)
router.delete("/:productId", checkAuth, deleteProduct)

module.exports = router