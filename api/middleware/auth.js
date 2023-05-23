const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//this is a middleware that checks the authentication before creation


const checkAuth = async (req, res, next) => {

    jwt.verify(req.header.token, process.env.JWT_SECRET, (err, result) => {
        




    })






    res.locals.user = user
    next();

}


module.exports = checkAuth;