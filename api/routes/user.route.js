const router = require("express").Router();
const  {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser} = require('../controllers/user.controller')
const checkAuth = require('../middleware/auth')

router.get('/', checkAuth, getAllUsers)
router.get('/:userId', checkAuth, getOneUser)
router.post('/', createNewUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)


module.exports = router;