const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//this is a middleware that checks the authentication before creation


const checkAuth = (req, res, next) => {

    jwt.verify(req.headers.token, process.env.JWT_SECRET, async (error, result) => {
        if(error){
            return res.status(403).send('>> Token not valid!')
        }
        const user = await User.findOne({ where: {email: result.email} })

        if(!user){
            return res.status(403).send('>> Token not valid!')
        }
        res.locals.user = user
        next();
    })
}

const checkAdmin = (req, res, next) => {
    if (res.locals.user.role != "admin") {
      return res.status(500).send(">> You are not authorized to access this resource");
    }
    next();
}

const checkId = async (req, res, next) => {
       
    await (() => {
        if(parseInt(req.params.userId) === res.locals.user.id){
            next()
        } else {
            res.status(500).send("Adonde vas chiquito chichon, que este no es tu usuario")
        }
    })()
}

module.exports = { checkAuth, checkAdmin, checkId };