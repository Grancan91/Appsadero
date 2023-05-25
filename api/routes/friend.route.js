const router = require("express").Router();
const {
    addFriend,
    deleteFriend,
    getAllFriends,
    getOneFriend } = require('../controllers/user.controller')
const { checkAuth } = require("../middleware/auth");


router.put('/add/:friendId', checkAuth, addFriend)
router.delete('/:friendId', checkAuth, deleteFriend)
router.get('/', checkAuth, getAllFriends)
router.get('/:friendId', checkAuth, getOneFriend)

module.exports = router;