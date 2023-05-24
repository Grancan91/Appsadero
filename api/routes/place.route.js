const router = require("express").Router();
const { getAllPlaces, getOnePlace, createPlace, updatePlace, deletePlace} = require("../controllers/place.controller");
const { checkAuth, checkId, checkAdmin } = require("../middleware/auth");

router.get("/",  getAllPlaces);
router.get("/:placeId",  getOnePlace);
router.post("/", createPlace); 
router.put("/:placeId", updatePlace);
router.delete("/:placeId", deletePlace);

module.exports = router;
