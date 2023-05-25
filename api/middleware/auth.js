const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const Asadero = require('../models/asadero.model')
//this is a middleware that checks the authentication before creation


const checkAuth = (req, res, next) => {

    jwt.verify(req.headers.token, process.env.JWT_SECRET, async (error, result) => {
        if(error){
            console.error(error)
            return res.status(403).send('>> Token not valid!')
        }
        const user = await User.findOne({ where: {email: result.email} })
    
        if(!user){
            console.error(error)
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

const checkOwner = async (req, res, next) => {
    
    try {
        //Search asadero where {param.id} and include his Users
        const asadero = await Asadero.findByPk(req.params.asaderoId,{
            include: User
        });

            const user = asadero.users.filter((user) => user.id == res.locals.user.id)
            if (user[0].user_asadero.isOwner){
                console.log("tenemos permiso")
                next()
            } else  {
                return res.status(500).send("usuario no tiene permisos")
            }

        
/* 
        const arrAsaderos = user.asaderos
        const filterAsadero = arrAsaderos.filter(element => element.id == res.locals.user.id)
        const isOwner = filterAsadero[0].user_asadero.isOwner */

        /* if (isOwner) {
            res.status(200).json(`Is Owner: ${isOwner}`)
            next()
        } else {
            //res.status(400).json(`Is Owner: ${isOwner}`)
        } */

    } catch (err) {
      return res.status(500).send(err)
    }
    
}

module.exports = { checkAuth, checkAdmin, checkOwner };