const router = require("express").Router();
const { getAllProfiles, getOneProfile, updateProfile, deleteProfile, payAsadero} = require('../controllers/user.controller')
const { checkAuth } = require("../middleware/auth");

router.get('/', checkAuth, getAllProfiles)
router.get('/:email', checkAuth , getOneProfile);
router.post('/addfriend', checkAuth,)//addFriends
router.put("/:userId", checkAuth, updateProfile);//checkId
router.put('/asadero/:asaderoId/pay/', checkAuth, payAsadero)
router.delete('/:userId', checkAuth, deleteProfile)//checkId





module.exports = router;