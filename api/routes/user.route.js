const router = require("express").Router();
const  {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser} = require('../controllers/user.controller')
const { checkAuth, checkAdmin } = require("../middleware/auth");

router.get('/', checkAuth, getAllUsers)
router.get('/:userId', checkAuth, getOneUser)
router.post("/", checkAdmin, createNewUser);
router.put("/:userId", checkAdmin, updateUser);
router.delete('/:userId', checkAdmin, deleteUser)


module.exports = router;