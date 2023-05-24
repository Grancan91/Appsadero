const router = require("express").Router();
const { getAllProfiles, getOneProfile, updateProfile, deleteProfile, getEagerUserAsadero} = require('../controllers/user.controller')
const { checkAuth, checkAdmin, checkId } = require("../middleware/auth");

router.get('/', checkAuth, getAllProfiles)
router.get('/:email', checkAuth , getOneProfile);
router.post('/:id/friend/:friendId', () => console.log('Amigo añadido'))

router.put("/:userId", checkAuth, checkId, updateProfile);
router.delete('/:userId', checkAuth, checkId, deleteProfile)
router.get('/:userId/asadero', checkAuth, getEagerUserAsadero)

module.exports = router;