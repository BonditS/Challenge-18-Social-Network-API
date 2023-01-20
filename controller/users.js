//import users model
const{ User, Thought }= require('../model/index');


//export 
module.exports = {
    //Get users
    getUser(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err)=> res.status(500).json(err));
    },

    // Gett a user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id})
            .then((user) => 
            !user
            ? res.status(404).json({ message: "No User with that ID"})
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    // Create one user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    //Update a user
    updateUser(req, res) {

        // should i use $addFields
        User.findOneAndUpdate(
            {_id: req.params.id},
            { $addFields: req.body},
            { runValidators: true, new: true},
        )
            .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with this ID'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //Delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.id})
        .then((user) => 
        !user
        ?res.status(404).json({ message: 'No user with input ID'})
        :Thought.deleteMany({ _id: {$in: user.thoughts}})
        )
        .then((user) => res.json(404).json({message: 'User data were deleted'}))
        .catch((err) => res.status(500).json(err));

    },
    //add a friend
    addFriend(req, res) {

    }
    //update a Friend
    updateFriend(req, res) {
        User.findONeAndUpdate(
            { _id: req.params.userId},
            { $addToSet: {friends: req.params.friendId}},
            { new: true}
        )
        
    }
};