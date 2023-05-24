const router = require("express").Router();
const { 
    getAllProfiles, 
    getOneProfile, 
    updateProfile, 
    deleteProfile, 
    getEagerUserAsadero} = require('../controllers/user.controller')
const { checkAuth, checkId } = require("../middleware/auth");

router.get('/', checkAuth, getAllProfiles)
router.get('/:email', checkAuth , getOneProfile);
router.put("/:userId", checkAuth, checkId, updateProfile);
router.delete('/:userId', checkAuth, checkId, deleteProfile)

//Route of Users in Asadero
router.get('/:userId/asadero', checkAuth, getEagerUserAsadero)


//Routes of friends
/* router.post('/friend', checkAuth, addFriend)
router.delete('/friend/:friendId', checkAuth, deleteFriend)
router.get('/friend/', checkAuth, getAllFriends)
router.get('/friend/:friendId', checkAuth, getOneFriend) */


module.exports = router;