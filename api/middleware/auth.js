const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

//this is a middleware that checks the authentication before creation


const checkAuth = (req, res, next) => {

    jwt.verify(req.header.token, process.env.JWT_SECRET, async (error, result) => {
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
    if (res.local.user.role != "admin") {
      return res.status(500).send(">> You are not authorized to access this resource");
    }
    next();
}


module.exports = { checkAuth, checkAdmin };