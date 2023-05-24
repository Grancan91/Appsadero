const router = require("express").Router();
const { getAllPreferences, getOnePreference, createPreference, updatePreference, deletePreference } = require('../controllers/preference.controller')
const {checkAuth, checkAdmin, checkId} = require('../middleware/auth')

router.get('/', checkAuth, getAllPreferences)
router.get('/:preferenceId', checkAuth, getOnePreference)
router.post('/', checkAdmin, createPreference)
router.put('/:preferenceId', checkAdmin, updatePreference)
router.delete('/:preferenceId', checkAdmin, deletePreference)

module.exports = router;
