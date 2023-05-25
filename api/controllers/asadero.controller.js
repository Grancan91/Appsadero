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

const getOneAsadero = async (req, res) => {
    try {
        const asadero = await Asadero.findByPk(req.params.asaderoId);
        return res.status(200).json(asadero);
    } catch {
        return res.status(400).send(">> This asadero isn't in our Database");
    }
};

const createAsadero = async (req, res) => {
    try{
        const asadero = await Asadero.create(req.body)
        const user = res.locals.user
        
        if(asadero){
            await Cart.create({asaderoId: asadero.id})
            await asadero.addUser(user.id, {through: { isOwner: true, isChef: false, status: "confirmed" }})
            return res.status(200).json('>> Asadero created!')
        }else{
            return res.status(400).send(">> Oops something went wrong1.")
        }
    }catch (error) {
        return res.status(500).send(">> Oops something went wrong2.")
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

//find all users of asadero
async function getEagerAsaderoUser(req, res) {
    try {
        const asadero = await Asadero.findOne({
            where: {
                id: req.params.asaderoId
            },
            include: User
        });
        return res.status(200).json(asadero)

    } catch (error) {
        return res.status(500).send("No fufa")
    }
}

module.exports = {
    getAllAsaderos,
    getOneAsadero, 
    createAsadero,
    deleteAsadero,
    updateAsadero,
    getEagerAsaderoUser
};