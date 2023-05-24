const router = require("express").Router()
const { createProduct, getOneProduct, getAllProducts, updateProduct, deleteProduct } = require("../controllers/product.controller")
const { checkAuth, checkAdmin } = require("../middleware/auth")

router.post("/", checkAuth, createProduct)
router.get("/:productId", checkAuth, getOneProduct)
router.get("/", checkAuth, getAllProducts)
router.put("/:productId", checkAuth, checkAdmin, updateProduct)
router.delete("/:productId", checkAuth, checkAdmin, deleteProduct)

module.exports = router