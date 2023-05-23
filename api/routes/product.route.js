const router = require("express").Router()

router.use("/", ()=>{console.log("New Product")})

module.exports = router