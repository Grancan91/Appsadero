const User = require('../models/user.model');
const Asadero = require("../models/asadero.model")

const getAllProfiles = async (req, res) =>  {
  try {
    const user = await User.findAll()
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).send(">> Oops something went wrong. Maybe this allergy exists in our DB")
  }
}


const getOneProfile = async (req, res) =>  {
    try{
        const user = await User.findOne({ where: {email: req.params.email} })
        delete user.password
        return res.status(200).json({Name: user.first_name})
    }catch{
        return  res.status(400).send(">> This user isn't in our Database");
    }
 }


const updateProfile = async (req, res) => {
  try {
    const [userExist, user] = await User.update(req.body, {
      returning: true,
      where: {
        id: req.params.userId,
      },
    });
    if (userExist !== 0) {
      return res.status(200).json({ message: "User updated", fields_updated: user });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    return res.status(500).send("Error to udpate user");
  }
};

const deleteProfile = async(req, res) => {
  try {
    const user = await User.destroy({ where: { id: req.params.userId } });
    return res.status(200).json("User deleted")
  }catch{
    return res.status(500).send("Error to udpate user")
  }
}

async function getEagerUserAsadero(req, res) {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId
      },
      include: Asadero
    });
    return res.status(200).json(user)

  } catch (error) {
    return res.status(500).send("No fufa")
  }
}



module.exports = {
  getAllProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
  getEagerUserAsadero
};