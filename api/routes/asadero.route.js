const router = require("express").Router();
const { 
    getAllAsaderos, 
    getOneAsadero, 
    createAsadero, 
    updateAsadero, 
    deleteAsadero, 
    getUsersFromAsadero,
    addUserToAsadero,
    deleteUserFromAsadero,
    udpateUserFromAsadero,
    getAllMyAsaderos,
    getOneMyAsadero
} = require("../controllers/asadero.controller.js");
const { checkAuth, checkAdmin } = require("../middleware/auth");

router.get('/', checkAuth,checkAdmin, getAllAsaderos) // ONLY ADMIN
router.get('/myAsaderos', checkAuth, getAllMyAsaderos) // ALL ASADEROS WHERE USER IS IN
router.get("/:asaderoId", checkAuth, checkAdmin, getOneAsadero) // ONLY ADMIN
//router.get('/myAsaderos/:asaderoId', checkAuth, getOneMyAsadero) // ONE ASADERO WHERE USER IS IN
router.get("/:asaderoId/users", checkAuth, getUsersFromAsadero)
router.put("/:asaderoId/user/:userId", checkAuth, udpateUserFromAsadero)
router.put('/:asaderoId', checkAuth, updateAsadero) //checkOwner
router.post('/', checkAuth, createAsadero)
router.post("/:asaderoId/user/:userId", checkAuth, addUserToAsadero)//checkOwner,
router.delete('/:asaderoId', checkAuth, deleteAsadero) 
router.delete("/:asaderoId/user/:userId", checkAuth, deleteUserFromAsadero);

module.exports = router;