const router = require("express").Router();
const { getAllAsaderos, getOneAsadero, createAsadero, updateAsadero, deleteAsadero, getUsersFromAsadero, udpateUserFromAsadero, addUserToAsadero, deleteUserFromAsadero, getAllMyAsaderos} = require("../controllers/asadero.controller.js");
const { checkAuth, checkAdmin } = require("../middleware/auth");

router.get('/', checkAuth,checkAdmin, getAllAsaderos) // ONLY ADMINgetAllMyAsaderos
router.get('/myAsaderos', checkAuth, getAllMyAsaderos) // ALL ASADEROS WHERE USER IS IN
router.get("/:asaderoId", checkAuth, checkAdmin, getOneAsadero) // ONLY ADMIN
//router.get('/myAsaderos/:asaderoId', checkAuth, getOneMyAsadero) // ONE ASADERO WHERE USER IS IN
router.get("/:asaderoId/users", checkAuth, getUsersFromAsadero)
router.put("/:asaderoId/user/:userId", checkAuth, udpateUserFromAsadero)
router.put('/:asaderoId', checkAuth, updateAsadero) //checkOwner
router.post('/', checkAuth, createAsadero)
router.put('/:asaderoId', updateAsadero) //Middlware isOwner
router.delete('/:asaderoId', deleteAsadero) //Middlware isOwner

router.get("/:asaderoId/user",  getUsersFromAsadero);
router.post("/:asaderoId/user/:userId",  addUserToAsadero);
router.delete("/:asaderoId/user/:userId",  deleteUserFromAsadero);
router.put("/:asaderoId/user/:userId",  udpateUserFromAsadero);

module.exports = router;