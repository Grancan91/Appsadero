const Asadero = require('../models/asadero.model')
const User = require('../models/user.model')
const Cart = require('../models/cart.model')

const getAllAsaderos = async (req, res) => {
    try {
        const asadero = await Asadero.findAll();
        return res.status(200).json(asadero);
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
} 

const getAllMyAsaderos = async (req, res) => {
    try {
        const user = await User.findByPk(res.locals.user.id, {
            include: Asadero
        });
        return res.status(200).json(user.asaderos);
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.");
    }
} 

const getOneAsadero = async (req, res) => {
    try {
        const asadero = await Asadero.findByPk(req.params.asaderoId);
        return res.status(200).json(asadero);
    } catch {
        return res.status(400).send(">> This asadero isn't in our Database");
    }
}

const getOneMyAsadero = async (req, res) => {
    try {
        const user = await User.findByPk(res.locals.user.id, {
            where: {
                id: asadero.id
            },
            include: Asadero            
        });
        return res.status(200).json(user.asaderos);
    } catch (error) {
        return res.status(400).send(">> Oops something went wrong.");
    }
}

const createAsadero = async (req, res) => {
    try{
        const asadero = await Asadero.create(req.body)
        const user = res.locals.user
        if(asadero){
            await Cart.create({asaderoId: asadero.id})
            await asadero.addUser(user.id, {through: { isOwner: true, isChef: false, status: "confirmed" }})
            return res.status(200).json('>> Asadero created!')
        }else{
            return res.status(400).send(">> Oops something went wrong.")
        }
    }catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const updateAsadero = async (req, res) => {
    try {
        const [asaderoExist, asadero] = await Asadero.update(req.body, {
            returning: true,
            where: {
                id: req.params.asaderoId,
            },
        });
        if (asaderoExist !== 0) {
            return res.status(200).json({ message: ">> Asadero updated", fields_updated: asadero });
        } else {
            return res.status(404).send(">> Oops! Asadero not found");
        }
    } catch (error) {
        return res.status(500).send("Error to udpate asadero");
    }
}

const deleteAsadero = async (req, res) => {
    try{
        const asadero =  await Asadero.destroy({ where: {id: req.params.userId}} )
        return res.status(200).send("Asadero Deleted")
    } catch (err) {
        res.status(400).send("Asadero has not been deleted")
    }
}

const getUsersFromAsadero = async (req, res) => {
    try {
        const asadero = await Asadero.findOne({
            where: {
                id: req.params.asaderoId
            },
            include: User
        });
        if(asadero.users){
            return res.status(200).json(asadero.users)
        }else{
            return res.status(400).send(">> No users in the asadero.")
        }
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const addUserToAsadero = async (req, res) => {
    try {
        const user_asadero = await User_Asadero.create({
            userId: req.params.userId,
            asaderoId: req.params.asaderoId,
            isOwner: false,
            isChef: req.body.isChef,
        });
        return res.status(200).json(user_asadero)
    } catch (error) {
        console.log(error)
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const deleteUserFromAsadero = async (req, res) => {
    try {
        const user_asadero = await User_Asadero.findOne({
            where: {
              userId: req.params.userId,
              asaderoId: req.params.asaderoId
            }
        });
        await user_asadero.destroy();
        return res.status(200).json(user_asadero)
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

const udpateUserFromAsadero = async (req, res) => {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }})
        const asadero = await Asadero.findOne({where: { id: req.params.asaderoId }})
        await user.setAsaderos([asadero], {
            through: {
                isChef: req.body.isChef,
                status: req.body.status 
            }
        })
        return res.status(200).json(asadero)
    } catch (error) {
        return res.status(500).send(">> Oops something went wrong.")
    }
}

//nombre horrible mejorar
async function addUserToAsadero(req, res) {
    try {
        const user_asadero = await User_Asadero.create({
            userId: req.params.userId,
            asaderoId: req.params.asaderoId,
            isOwner: req.body.isOwner,
            isChef: req.body.isChef,
            status: req.body.status 
        });
        
        return res.status(200).json(user_asadero)

    } catch (error) {
        return res.status(500).send(error)
    }
}

async function deleteUserFromAsadero(req, res) {
    try {
        const user_asadero = await User_Asadero.findOne({
            where: {
              userId: req.params.userId,
              asaderoId: req.params.asaderoId
            }
          });
          
          await user_asadero.destroy();
            
        return res.status(200).json(user_asadero)

    } catch (error) {
        return res.status(500).send(error)
    }
}

async function udpateUserFromAsadero(req, res) {
    try {
        const user = await User.findOne({ where: { id: req.params.userId }})
        const asadero = await Asadero.findOne({where: { id: req.params.asaderoId }})
        await user.setAsaderos([asadero], {
            through: {
                isOwner: req.body.isOwner,
                isChef: req.body.isChef,
                status: req.body.status 
            }
        })
        return res.status(200).json(asadero)
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = {
    getAllAsaderos,
    getOneAsadero, 
    createAsadero,
    deleteAsadero,
    updateAsadero,
    getUsersFromAsadero,
    addUserToAsadero,
    deleteUserFromAsadero,
    udpateUserFromAsadero,
    getAllMyAsaderos,
    getOneMyAsadero
};

