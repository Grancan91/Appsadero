const router = require("express").Router();
const { getAllPlaces, getOnePlace, createPlace, updatePlace, deletePlace} = require("../controllers/place.controller");
const { checkAuth, checkAdmin } = require("../middleware/auth");

router.get("/", checkAuth, getAllPlaces);
router.get("/:placeId", checkAuth, getOnePlace);
//router.post("/", checkAdmin, createPlace); TAREA DEL ADMIN!!! ********************
router.put("/:placeId", checkAdmin, updatePlace);
router.delete("/:placeId", checkAdmin, deletePlace);

module.exports = router;
