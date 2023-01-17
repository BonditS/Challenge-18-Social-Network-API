//import users model
const User = require('../models/User');

//export 
module.exports = {
    getUser(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err)=> res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
        .then((user) => 
        !user
        ? res.status(404).json({ message: "No User with that ID"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addFields: req.body}
        )
    },
    
};