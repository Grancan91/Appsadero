const router = require('express').Router()

router.use('/user', require('./user.route'));
router.use("/auth", require('./auth.route'));



module.exports = router;