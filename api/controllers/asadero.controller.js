const Asadero = require('../models/asadero.model')
const User = require('../models/user.model')

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
        const asadero = await Asadero.create({
            name: req.body.name,
            description: req.body.description,
            date_time: req.body.date_time,
            duration: req.body.duration,
            price: req.body.price,
            comments: req.body.comments,
            confirmation_date: req.body.confirmation_date
        })
        return res.status(200).json('>> Asadero created!')
    }catch (error) {
        console.log(error)
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

//find all users of asadero
async function getUsersFromAsadero(req, res) {
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
    udpateUserFromAsadero
};