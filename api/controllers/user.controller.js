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
    if (parseInt(req.params.userId) === res.locals.user.id){
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
    }
    res.status(500).send("Access denied")

  } catch (error) {
    return res.status(500).send("Error to udpate user");
  }
};

const deleteProfile = async(req, res) => {
  try {
    if (parseInt(req.params.userId) === res.locals.user.id) {
    const user = await User.destroy({ where: { id: req.params.userId } });
    return res.status(200).json("User deleted")
    }
    res.status(500).send("Access denied")
  }catch{
    return res.status(500).send("Error to udpate user")
  }
}

async function getAsaderosFromUser(req, res) {
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


//Controllers of the relationship between users and their friends

const getAllFriends = async (req, res) => {
  try {
    const user = res.locals.user;
    const friends = await user.getFriend();
     

    res.status(200).json(friends);
  } catch (error) {
    return res.status(500).send("Oops, something went wrong. Maybe this user doesn't have any friends yet.");
  }
};

const getOneFriend = async (req, res) => {
  try{
    const user = res.locals.user;
    const friend = await User.findOne({
      where: {
        id: req.params.friendId
      }
    })
    await user.getFriend()
    return res.status(200).json(friend)


  } catch (error) {
    console.error(error)
    return res.status(400).send('Friend not found')
  }
} 


const addFriend = async (req, res) => {
  try {
    const user = res.locals.user;
    const friends = req.body;

    if (friends.id !== user.id) {
      const friend = await User.findOne({ where: { id: friends.id} });
      if (friend) {
        const isAlreadyFriend = await user.hasFriend(friend);
        if (!isAlreadyFriend) {
          await user.addFriend(friend);
          return res.status(200).json(friend);
        } else {
          return res.status(400).send(`User with ID ${friends.id} is already a friend`);
        }
      } else {
        return res.status(404).send(`Friend with ID ${friends.id} not found`);
      }
    }
      return res.status(500).send('Cannot be your own friend in this DB');   
  } catch (error) {
    return res.status(500).send('An error occurred while adding a friend');
  }
};



const deleteFriend = async (req, res) => {
  try {
    const user = res.locals.user;
    const friend = await User.findByPk(req.params.friendId)
    if (friend) {
      const isAlreadyFriend = await user.hasFriend(friend);
      if (!isAlreadyFriend) {
        return res.status(400).send('Friend not found')
      }
    await user.removeFriend(friend)
    return res.status(200).json('Friend deleted')
    }
  } catch (error) {
    console.error(error)
    return res.status(400).send('Friend not found')
  }
}

//ejemplo
module.exports = {
  getAllProfiles,
  getOneProfile,
  updateProfile,
  deleteProfile,
  addFriend,
  deleteFriend,
  getAllFriends,
  getOneFriend,
  getAsaderosFromUser
};