const {Thought ,User } = require('./model/index')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(404).json(err));
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thougth with input ID'})
            : res.status(200).json(thought))
        .catch((err) => res.status(500).json(err));
    },
    createThougth(req, res) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: {thoughts: thought._id}},
            { new: true}
        )
        .then((user) => 
        !user
        ? res.status(404).json({ message: 'No user with matching ID'})
        : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
}
