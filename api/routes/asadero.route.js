const router = require("express").Router();
const { getAllAsaderos, getOneAsadero, createAsadero, updateAsadero, deleteAsadero, getEagerAsaderoUser} = require("../controllers/asadero.controller.js");
const { checkAuth, checkAdmin } = require("../middleware/auth");


router.get('/admin', checkAuth, checkAdmin, getAllAsaderos) //ROUTER ADMIN
router.get('/', checkAuth, getAllAsaderos) // reslocals.user

router.get("/:asaderoId",  getOneAsadero);
router.post('/', checkAuth, createAsadero)
router.put('/:asaderoId', updateAsadero) //Middlware isOwner
router.delete('/:asaderoId', deleteAsadero) //Middlware isOwner

router.get("/:asaderoId/user",  getEagerAsaderoUser);


module.exports = router;