const router = require("express").Router();
const  {getAllUsers, getOneUser, createNewUser, updateUser, deleteUser} = require('../controllers/user.controller')
const { checkAuth, checkAdmin, checkId } = require("../middleware/auth");

router.get('/', checkAuth, getAllUsers)
router.get('/:userId', checkAuth, getOneUser)
router.post("/", checkAdmin, createNewUser);
router.put("/:userId", checkAuth, checkId, updateUser);
router.delete('/:userId', checkAuth, checkId, deleteUser)


module.exports = router;