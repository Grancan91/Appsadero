const router = require("express").Router();
const { getAllAsaderos, getOneAsadero, createAsadero, updateAsadero, deleteAsadero} = require("../controllers/asadero.controller.js");

//router.get('/', getAllAsaderos)
router.get("/:asaderoId", getOneAsadero);
router.post('/', createAsadero)
router.put('/:asaderoId', updateAsadero)
router.delete('/:asaderoId', deleteAsadero)


module.exports = router;