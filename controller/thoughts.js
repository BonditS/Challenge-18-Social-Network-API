const {Thought ,User } = require('../model')

module.exports = {
    //find all thought
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(404).json(err));
    },

    //Get one thought
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thougth with input ID'})
            : res.status(200).json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //Create one thought
    createThought(req, res) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: {thoughts: thought._id}},
            { new: true}
        )
        .then((user) => 
            !user
            ? res.status(404).json({ message: 'No user with input ID'})
            : res.status(200).json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //Update one thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addFields: req.body},
            { runValidators: true, new: true }
        )
        .then((thought)=>
        !thought
            ? res.status(400).json({ message: "No thought with input ID"})
            : res.status(200).json(thought))
        .catch((err) => res.status(500).json(err));
    },

    //Delete thought
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.thoughtId}
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thougth with input ID'})
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId},
                    { $pull: { thoghts: req.params.thoughtId}}
            )) 
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'User not found'})
                : res.status(200).json(user))
            
            .catch((err) => res.status(500).json(err));
            
    },

    //create reaction

    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $addToSet: { reactions: req.body}},
            { new: true}
        ) 
        .then((thought) => 
            !thought
            ? res.status(404).json({ message: 'No thougth with input ID'})
            : res.status(200).json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //delete reation
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thougthId},
            { $pull: {reactions: {reactionId: req.params.reactionId}}},
            { new: true}
        )
        .then((thougth) =>
            !thought
            ?res.status(404).json({ message: 'No thought with input ID'})
            :res.status(200).json({ message: 'Reaction deleted successfully'})
        )
        .catch((err)=> res.status(500).json(err));
    }

};
