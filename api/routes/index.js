const router = require('express').Router()

const authRouter = require('./auth.route');

router.use('/', () => console.log('a ver si es verdad'))
router.use("/auth", authRouter);



module.exports = router;