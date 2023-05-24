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


/* const getAllFriends = async (req, res) {

}

const getOneFriends = async (req, res) {

} */

const addFriends = async(req, res) => {
  try{
    const user = res.locals.user;
    
    if(req.body.length > 0){
    const friends  = await User.findAll({
      where: {
        id: req.body
      }
    });
      await user.addFriends(friends)
      return res.status(200).json(friends)

    }else{
      const friend = await User.findByPk({
        where: {
          id: req.body
        }
      });
      await user.addFriend(friend)
      return res.status(200).json(friend)
    }   
  }catch(error){
    console.error(error)
    return res.status(400).send('Friend not found')
  }
}

const deleteFriend = async (req, res) => {
  try{
  const user = res.locals.user;
  if (req.body.length > 0) {
    const friends = await User.findAll({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }
    })
    await user.removeFriends(friends)
  }else{
    const friend = await User.findOne({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
      }
    })
    await user.removeFriend(friend)

  }
  }catch (error){
    return res.status(400).send('Friend not eliminated')

  }


} 

//ejemplo
module.exports = {
  getAllProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
  addFriends,
  deleteFriend,
  getEagerUserAsadero
};