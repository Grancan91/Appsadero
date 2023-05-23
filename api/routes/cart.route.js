const router = require("express").Router()
const { createCart, getOneCart, getAllCart, updateCart, deleteCart } = require("../controllers/cart.controller")
const { checkAuth } = require("../middleware/auth")

router.post("/", checkAuth, createCart)
router.get("/:cartId", checkAuth, getOneCart)
router.get("/", checkAuth, getAllCart)
router.put("/:cartId", checkAuth, updateCart)
router.delete("/:cartId", checkAuth, deleteCart)

module.exports = router