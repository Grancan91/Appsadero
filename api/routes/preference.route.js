const router = require("express").Router();
const { getAllPreferences, getOnePreference, createPreference, updatePreference, deletePreference } = require('../controllers/preference.controller')
const {checkAuth, checkAdmin} = require('../middleware/auth')

router.get('/', checkAuth, getAllPreferences)
router.get('/:preferenceId', checkAuth, getOnePreference)
router.post('/', checkAuth, checkAdmin, createPreference)
router.put('/:preferenceId', checkAuth, checkAdmin, updatePreference)
router.delete('/:preferenceId', checkAuth, checkAdmin, deletePreference)

module.exports = router;
