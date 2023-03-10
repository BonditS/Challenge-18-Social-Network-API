const router = require('express').Router();

const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    updateFriend,
    deleteFriend,
} = require('../../controller/users');

router.route('/').get(getUser).post(createUser);

router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);

router.route('/:userId/friends/:friendId')
.post(updateFriend)
.delete(deleteFriend);

module.exports = router;