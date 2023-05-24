const router = require("express").Router();
const { getAllAllergies, getOneAllergy, createAllergy,
    updateAllergy, deleteAllergy } = require('../controllers/allergy.controller')
const { checkAuth, checkAdmin } = require("../middleware/auth");


router.get("/", checkAuth, getAllAllergies);
router.get("/:allergyId", checkAuth, getOneAllergy);
router.post("/", checkAdmin, createAllergy)
router.put("/:allergyId", checkAdmin, updateAllergy);
router.delete("/:allergyId", checkAdmin, deleteAllergy);