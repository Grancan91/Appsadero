const router = require("express").Router()
const { createCart, getOneCart, getAllCart, updateCart, deleteCart, addProductsToCart, deleteProductFromCart } = require("../controllers/cart.controller")
const { checkAuth } = require("../middleware/auth")

router.post("/", checkAuth, createCart)
router.get("/:cartId", checkAuth, getOneCart)
router.get("/", checkAuth, getAllCart)
router.put("/:cartId", checkAuth, updateCart)
router.put('/:cartId/product/:productId', checkAuth, addProductsToCart)
router.delete("/:cartId", checkAuth, deleteCart)
router.delete('/:cartId/product/:productId', checkAuth, deleteProductFromCart)

module.exports = router