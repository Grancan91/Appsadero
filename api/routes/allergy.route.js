const router = require("express").Router();
const { getAllAllergies, getOneAllergy, createAllergy,
    updateAllergy, deleteAllergy } = require('../controllers/allergy.controller')
const { checkAuth, checkAdmin } = require("../middleware/auth");


router.get("/", getAllAllergies);
router.get("/:allergyId", getOneAllergy);
router.post("/", createAllergy);
router.put("/:allergyId", updateAllergy);
router.delete("/:allergyId", deleteAllergy);

module.exports = router;