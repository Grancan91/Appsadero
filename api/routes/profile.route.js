const router = require("express").Router();
const { 
    getAllProfiles, 
    getOneProfile, 
    updateProfile, 
    deleteProfile
    } = require('../controllers/user.controller')
const { checkAuth } = require("../middleware/auth");

router.get('/', checkAuth, getAllProfiles)
router.get('/:email', checkAuth , getOneProfile);
router.put("/:userId", checkAuth, updateProfile);
router.delete('/:userId', checkAuth, deleteProfile)






module.exports = router;