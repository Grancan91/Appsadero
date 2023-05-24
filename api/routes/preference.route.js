const router = require("express").Router();
const {
    getAllPreferences,
    getOnePreference,
    createPreference,
    updatePreference,
deletePreference} = require('../controllers/preference.controller')

router.get('/', getAllPreferences)
router.get('/:preferenceId', getOnePreference)
router.post('/', createPreference)
router.put('/:preferenceId', updatePreference)
router.delete('/:preferenceId', deletePreference)

module.exports = router;
